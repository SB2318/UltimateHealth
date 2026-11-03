import os
import sys
import json
import urllib.request
import urllib.error
import re
from datetime import datetime, timezone, timedelta

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# ---------------------------------------------------------------------------
# GitHub API helper
# ---------------------------------------------------------------------------

def api_request(url, token, method="GET", data=None):
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "RepoIssueGroomerBot"
    }

    if data is not None:
        data = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            if response.status in [204]:
                return None
            body = response.read().decode("utf-8")
            return json.loads(body) if body else {}
    except urllib.error.URLError as e:
        print(f"  ⚠️  API Request failed for {url}: {e}")
        if hasattr(e, "read"):
            try:
                print(e.read().decode("utf-8"))
            except Exception:
                pass
        return None

# ---------------------------------------------------------------------------
# Step Summary Helper
# ---------------------------------------------------------------------------

def _write_step_summary(lines):
    summary_file = os.environ.get("GITHUB_STEP_SUMMARY")
    if not summary_file: return
    try:
        with open(summary_file, "a", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
    except Exception as e:
        print(f"[WARN] Could not write step summary: {e}")

# ---------------------------------------------------------------------------
# Pagination helpers
# ---------------------------------------------------------------------------

def get_all_open_issues(repo, token):
    issues = []
    page = 1
    consecutive_errors = 0
    MAX_ERRORS = 3

    print(f"  📥 Fetching all open issues (paginated)...")
    while True:
        url = f"https://api.github.com/repos/{repo}/issues?state=open&per_page=100&page={page}"
        batch = api_request(url, token)

        if batch is None:
            consecutive_errors += 1
            if consecutive_errors >= MAX_ERRORS:
                print(f"     ❌ Too many consecutive errors, stopping pagination at page {page}")
                break
            page += 1
            continue

        consecutive_errors = 0
        if len(batch) == 0:
            break

        issues.extend(batch)
        if len(batch) < 100:
            break
        page += 1

    real_issues = [i for i in issues if "pull_request" not in i]
    print(f"  ✅ Open issues fetched: {len(real_issues)}\n")
    return real_issues

def get_recently_closed_issues(repo, token, max_pages=2):
    issues = []
    for page in range(1, max_pages + 1):
        url = f"https://api.github.com/repos/{repo}/issues?state=closed&per_page=100&page={page}"
        batch = api_request(url, token)
        if not batch: break
        issues.extend([i for i in batch if "pull_request" not in i])
        if len(batch) < 100: break
    return issues

def get_issue_timeline(repo, issue_number, token):
    timeline = []
    page = 1
    while page <= 5:
        url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/timeline?per_page=100&page={page}"
        batch = api_request(url, token)
        if not batch:
            break
        timeline.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    return timeline

def get_issue_comments(repo, issue_number, token):
    comments = []
    page = 1
    while True:
        url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments?per_page=100&page={page}"
        batch = api_request(url, token)
        if batch is None or len(batch) == 0:
            break
        comments.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    return comments

def get_repo_milestones(repo, token):
    url = f"https://api.github.com/repos/{repo}/milestones?state=open"
    return api_request(url, token) or []

# ---------------------------------------------------------------------------
# Commit Matching & Auto-closing
# ---------------------------------------------------------------------------

def scan_commits_and_resolve_issues(repo, token, open_issues_dict):
    """
    Scans the last 100 commits on main. If a commit message contains Fixes #N,
    Closes #N, or Resolves #N for an open issue, post comment and close it.
    """
    print(f"\n🔍 Scanning recent commits on main for issue resolution keywords...")
    url = f"https://api.github.com/repos/{repo}/commits?per_page=100"
    commits = api_request(url, token)
    if not commits or not isinstance(commits, list):
        print("  ⚠️ Could not fetch commits or empty response.")
        return 0

    resolved_count = 0
    keyword_regex = re.compile(
        r'(?:close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)\s+#(\d+)',
        re.IGNORECASE
    )

    for c in commits:
        commit_info = c.get("commit", {})
        message = commit_info.get("message", "")
        sha = c.get("sha", "")[:7]
        author = commit_info.get("author", {}).get("name", "Maintainer")

        matches = keyword_regex.findall(message)
        for num_str in matches:
            issue_num = int(num_str)
            if issue_num in open_issues_dict:
                # Issue is currently open and resolved by this commit!
                issue_data = open_issues_dict[issue_num]
                issue_title = issue_data.get("title", "")
                print(f"  🎯 Found match: Commit {sha} resolves open issue #{issue_num} (\"{issue_title[:40]}\")")
                
                body = (
                    f"🎉 **Resolved by commit [{sha}](https://github.com/{repo}/commit/{sha})** by {author}.\n\n"
                    f"> *Commit message:* `{message.splitlines()[0]}`\n\n"
                    f"Closing this issue as completed. Thank you!"
                )
                api_request(f"https://api.github.com/repos/{repo}/issues/{issue_num}/comments", token, method="POST", data={"body": body})
                api_request(f"https://api.github.com/repos/{repo}/issues/{issue_num}", token, method="PATCH", data={"state": "closed", "state_reason": "completed"})
                
                resolved_count += 1
                del open_issues_dict[issue_num]

    print(f"  ✅ Auto-resolved {resolved_count} issue(s) via commit history.\n")
    return resolved_count

# ---------------------------------------------------------------------------
# PR merge check
# ---------------------------------------------------------------------------

def get_linked_prs(repo, token, timeline):
    prs = []
    seen = set()
    for event in timeline:
        if event.get("event") == "cross-referenced":
            source = event.get("source", {})
            source_issue = source.get("issue", {})
            if source.get("type") == "issue" and "pull_request" in source_issue:
                pr_number = source_issue.get("number")
                pr_url    = source_issue.get("pull_request", {}).get("url", "")
                if pr_number and pr_number not in seen:
                    seen.add(pr_number)
                    prs.append((pr_number, pr_url))
    return prs

def check_pr_merged(repo, token, pr_number):
    url  = f"https://api.github.com/repos/{repo}/pulls/{pr_number}"
    data = api_request(url, token)
    if not data:
        return False, False

    merged = data.get("merged", False)
    base_repo = data.get("base", {}).get("repo", {}).get("full_name", "")
    merged_into_ours = (base_repo == repo)
    return merged, (merged and merged_into_ours)

# ---------------------------------------------------------------------------
# Commenter helpers
# ---------------------------------------------------------------------------

def get_commenters(timeline, repo_owner, exclude_logins=None):
    exclude = set(exclude_logins or [])
    exclude.add(repo_owner)
    exclude.add("SB2318")

    commenters = []
    seen = set()
    for event in timeline:
        if event.get("event") == "commented":
            actor = event.get("actor", {}).get("login", "")
            if actor and actor not in seen and actor not in exclude and "bot" not in actor.lower():
                seen.add(actor)
                commenters.append(actor)
    return commenters

def already_posted_open_call(comments):
    marker = "<!-- unassignbot-open-call -->"
    return any(marker in c.get("body", "") for c in comments)

def already_posted_close_notice(comments):
    marker = "<!-- unassignbot-pr-merged-close -->"
    return any(marker in c.get("body", "") for c in comments)

# ---------------------------------------------------------------------------
# Closed Issues Audit
# ---------------------------------------------------------------------------

def audit_closed_issues(repo, token):
    """
    Cleans up assignees on closed issues so contributor quotas aren't artificially blocked.
    """
    print(f"\n🧹 Auditing closed issues for dangling assignments...")
    closed_issues = get_recently_closed_issues(repo, token, max_pages=2)
    cleaned_count = 0

    for issue in closed_issues:
        assignees = issue.get("assignees", [])
        if not assignees:
            continue
            
        labels = [l.get("name", "").lower() for l in issue.get("labels", [])]
        if "preserve-assignment" in labels:
            continue
            
        issue_number = issue["number"]
        assignee_logins = [a["login"] for a in assignees]
        
        # Remove assignees from closed issue
        api_request(
            f"https://api.github.com/repos/{repo}/issues/{issue_number}/assignees",
            token, method="DELETE", data={"assignees": assignee_logins}
        )
        print(f"  🔓 Removed dangling assignees ({', '.join(assignee_logins)}) from closed issue #{issue_number}")
        cleaned_count += len(assignee_logins)

    print(f"  ✅ Closed issues audit complete: {cleaned_count} dangling assignments cleared.\n")
    return cleaned_count

# ---------------------------------------------------------------------------
# Main schedule handler
# ---------------------------------------------------------------------------

def handle_schedule(repo, token):
    raw_issues = get_all_open_issues(repo, token)
    open_issues_dict = {i["number"]: i for i in raw_issues}
    now = datetime.now(timezone.utc)
    owner = repo.split("/")[0]

    print(f"\n{'='*60}")
    print(f"  📋 Total open issues fetched : {len(open_issues_dict)}")
    print(f"  🕐 Current UTC time          : {now.strftime('%Y-%m-%d %H:%M:%S')} UTC")
    print(f"{'='*60}\n")

    # Step 1: Commit Resolution Scanning
    cnt_commit_resolved = scan_commits_and_resolve_issues(repo, token, open_issues_dict)

    # Step 2: Milestone Fetching for Auto-attachment
    milestones = get_repo_milestones(repo, token)
    default_milestone_id = None
    for m in milestones:
        m_title = m.get("title", "").lower()
        if "v1.0" in m_title or "release" in m_title:
            default_milestone_id = m.get("number")
            break
    if not default_milestone_id and milestones:
        default_milestone_id = milestones[0].get("number")

    # Counters
    cnt_no_assignee     = 0
    cnt_open_call       = 0
    cnt_pr_merged_close = 0
    cnt_pr_linked_skip  = 0
    cnt_owner_skip      = 0
    cnt_reminded        = 0
    cnt_unassigned      = 0
    cnt_stale_closed    = 0
    cnt_ok              = 0

    # Process remaining open issues
    for issue_number, issue in list(open_issues_dict.items()):
        assignees   = issue.get("assignees", [])
        issue_title = issue.get("title", "(no title)")
        labels      = [l.get("name", "").lower() for l in issue.get("labels", [])]

        print(f"\n  🔍 #{issue_number:>5}  \"{issue_title[:60]}\"")

        # ── Check needs-information staleness (> 14 days) ───────────────────
        if "needs-information" in labels:
            updated_at_str = issue.get("updated_at")
            if updated_at_str:
                updated_at = datetime.strptime(updated_at_str, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
                if (now - updated_at).days >= 14:
                    print(f"           🕒 Stale 'needs-information' (> 14 days) → auto-closing")
                    body = (
                        "<!-- groomer-stale-close -->\n"
                        "This issue was marked as `needs-information` and has had no activity for over 14 days.\n\n"
                        "To keep the issue backlog clean and actionable, this issue is now automatically closed.\n"
                        "Feel free to provide the requested details and ask a maintainer to reopen anytime!"
                    )
                    api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": body})
                    api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}", token, method="PATCH", data={"state": "closed", "state_reason": "not_planned"})
                    cnt_stale_closed += 1
                    continue

        # ── Timeline Fetch ──────────────────────────────────────────────────
        timeline = get_issue_timeline(repo, issue_number, token)
        if not timeline:
            print(f"           → SKIP: could not fetch timeline")
            continue

        assignee_logins = [a["login"] for a in assignees]
        commenters = get_commenters(timeline, owner, exclude_logins=assignee_logins)

        # ── CASE 1: No assignee — ping all commenters ───────────────────────
        if not assignees:
            cnt_no_assignee += 1
            print(f"           ⬜ No assignees")

            if commenters:
                existing_comments = get_issue_comments(repo, issue_number, token)
                if not already_posted_open_call(existing_comments):
                    ping_str = " ".join(f"@{u}" for u in commenters)
                    body = (
                        "<!-- unassignbot-open-call -->\n"
                        f"👋 This issue currently has **no assignee**. "
                        f"Is anyone interested in working on it?\n\n"
                        f"{ping_str} — if you'd like to take this, "
                        f"please reply with `/assign` or `/claim` to get assigned! 🙌\n"
                        f"*Tip: You can also comment `/scope` for suggested MVP breakdown.*"
                    )
                    api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": body})
                    cnt_open_call += 1
                    print(f"           📢 OPEN-CALL posted → pinged: {', '.join(commenters)}")
            continue

        # ── CASE 2: Has assignee(s) — check for linked PRs ─────────────────
        print(f"           Assignee(s): {', '.join(assignee_logins)}")
        linked_prs = get_linked_prs(repo, token, timeline)

        if linked_prs:
            print(f"           🔗 Linked PR(s): {[n for n, _ in linked_prs]}")
            merged_pr = None
            for pr_number, pr_url in linked_prs:
                is_merged, merged_into_ours = check_pr_merged(repo, token, pr_number)
                if merged_into_ours:
                    merged_pr = pr_number
                    break

            if merged_pr:
                existing_comments = get_issue_comments(repo, issue_number, token)
                if not already_posted_close_notice(existing_comments):
                    body = (
                        "<!-- unassignbot-pr-merged-close -->\n"
                        f"✅ **Closing this issue automatically.**\n\n"
                        f"Linked PR #{merged_pr} has been merged into `{repo}`. "
                        f"Great work {' '.join(f'@{a}' for a in assignee_logins)}! 🎉\n\n"
                        f"*If this was closed by mistake, please reopen.*"
                    )
                    api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": body})
                    api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}", token, method="PATCH", data={"state": "closed", "state_reason": "completed"})
                    cnt_pr_merged_close += 1
                    print(f"           ✅ CLOSED — PR #{merged_pr} merged into {repo}")
            else:
                cnt_pr_linked_skip += 1
                print(f"           → SKIP unassign: PR linked but not yet merged")
            continue

        # ── CASE 3: Assignee(s), no linked PR — apply 7-day rule ───────────
        assignees_to_remove = []

        for assignee in assignees:
            login = assignee["login"]
            if login == "SB2318":
                cnt_owner_skip += 1
                print(f"           → SKIP assignee @{login}: owner, never unassigned")
                continue

            assigned_at_str = None
            for event in reversed(timeline):
                if event.get("event") == "assigned" and event.get("assignee", {}).get("login") == login:
                    assigned_at_str = event.get("created_at")
                    break

            if not assigned_at_str:
                assigned_at_str = issue.get("created_at")

            if assigned_at_str:
                assigned_at = datetime.strptime(assigned_at_str, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
                days_assigned = (now - assigned_at).days
                print(f"           👤 @{login}: assigned {days_assigned} day(s) ago ({assigned_at_str})")

                if days_assigned >= 7:
                    assignees_to_remove.append(login)
                    print(f"              🔴 QUEUED FOR UNASSIGN (>= 7 days, no PR)")
                elif days_assigned == 5:
                    existing_comments = get_issue_comments(repo, issue_number, token)
                    already_reminded = any(
                        f"@{login}" in c.get("body", "") and
                        "you have been assigned to this issue for 5 days" in c.get("body", "")
                        for c in existing_comments
                    )
                    if not already_reminded:
                        body = (
                            f"Just a friendly reminder @{login}: you have been assigned to this issue for 5 days. "
                            f"Please submit a PR and mention this issue soon, or you will be unassigned in 2 days.\n"
                            f"*Need help refining the scope? Feel free to comment `/scope`!*"
                        )
                        api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": body})
                        cnt_reminded += 1
                        print(f"              🟡 REMINDER POSTED (day 5 warning)")
                else:
                    cnt_ok += 1

        if assignees_to_remove:
            api_request(
                f"https://api.github.com/repos/{repo}/issues/{issue_number}/assignees",
                token, method="DELETE", data={"assignees": assignees_to_remove}
            )
            cnt_unassigned += len(assignees_to_remove)

            ping_list = [f"@{u}" for u in commenters if u not in assignees_to_remove]
            ping_msg  = f" Pinging next in queue: {', '.join(ping_list)}." if ping_list else ""

            body = (
                f"The previous assignee(s) **{', '.join(assignees_to_remove)}** have been unassigned "
                f"due to 7 days of inactivity (no PR submitted).{ping_msg} "
                f"If you are still interested, please reply with `/assign` or `/claim` to claim it."
            )
            api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": body})
            print(f"           ✅ UNASSIGNED: {', '.join(assignees_to_remove)}")

    # Step 3: Audit closed issues
    cnt_dangling_cleared = audit_closed_issues(repo, token)

    # Step 4: Summary output & GitHub Step Summary
    print(f"\n{'='*60}")
    print(f"  📊 REPO HYGIENE & ISSUE GROOMING SUMMARY")
    print(f"{'='*60}")
    print(f"  Total open issues scanned   : {len(raw_issues)}")
    print(f"  🎯 Auto-resolved by commits : {cnt_commit_resolved}")
    print(f"  ✅ Closed (PR merged)       : {cnt_pr_merged_close}")
    print(f"  🕒 Stale needs-info closed  : {cnt_stale_closed}")
    print(f"  📢 Open-call pings sent     : {cnt_open_call}")
    print(f"  🟡 Day 5 reminders sent     : {cnt_reminded}")
    print(f"  🔴 7-Day unassignments      : {cnt_unassigned}")
    print(f"  🔓 Dangling assignees wiped : {cnt_dangling_cleared}")
    print(f"{'='*60}\n")

    _write_step_summary([
        "## 🧹 Repository Hygiene & Issue Grooming Report",
        f"- **Scanned Open Issues:** {len(raw_issues)}",
        f"- **Auto-Resolved by Commit:** {cnt_commit_resolved}",
        f"- **Closed via Merged PR:** {cnt_pr_merged_close}",
        f"- **Closed Stale Needs-Info:** {cnt_stale_closed}",
        f"- **Open-Call Pings Sent:** {cnt_open_call}",
        f"- **5-Day Reminders Sent:** {cnt_reminded}",
        f"- **7-Day Inactive Unassigned:** {cnt_unassigned}",
        f"- **Cleared Dangling Assignees on Closed Issues:** {cnt_dangling_cleared}"
    ])

def main():
    token      = os.environ.get("GITHUB_TOKEN")
    repo       = os.environ.get("GITHUB_REPOSITORY")
    event_name = os.environ.get("GITHUB_EVENT_NAME")

    if not token or not repo:
        print("Missing required environment variables (GITHUB_TOKEN, GITHUB_REPOSITORY).")
        return

    if event_name in ["schedule", "workflow_dispatch"]:
        print("🤖 Running scheduled repository & issue hygiene checks...")
        handle_schedule(repo, token)
    else:
        print(f"Running groomer for event: {event_name}")
        handle_schedule(repo, token)

if __name__ == "__main__":
    main()
