import os
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# GitHub API helper
# ---------------------------------------------------------------------------

def api_request(url, token, method="GET", data=None):
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Unassignbot"
    }

    if data is not None:
        data = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            if response.status in [204]:
                return None
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.URLError as e:
        print(f"  ⚠️  API Request failed for {url}: {e}")
        if hasattr(e, "read"):
            print(e.read().decode("utf-8"))
        return None


# ---------------------------------------------------------------------------
# Pagination helpers
# ---------------------------------------------------------------------------

def get_all_open_issues(repo, token):
    """Paginate through ALL open issues (and PRs), then filter out PRs.

    Key fix: distinguish between:
      - None  → API error (skip page but keep going, don't abort early)
      - []    → no more results (stop pagination)
    """
    issues = []
    page = 1
    consecutive_errors = 0
    MAX_ERRORS = 3  # abort only after 3 consecutive failures

    print(f"  📥 Fetching all open issues (paginated)...")
    while True:
        url = f"https://api.github.com/repos/{repo}/issues?state=open&per_page=100&page={page}"
        batch = api_request(url, token)

        if batch is None:
            consecutive_errors += 1
            print(f"     ⚠️  Page {page}: API error ({consecutive_errors}/{MAX_ERRORS} consecutive)")
            if consecutive_errors >= MAX_ERRORS:
                print(f"     ❌ Too many consecutive errors, stopping pagination at page {page}")
                break
            page += 1
            continue

        consecutive_errors = 0

        if len(batch) == 0:
            print(f"     ✅ Page {page}: empty — pagination complete")
            break

        issues.extend(batch)
        prs_in_batch    = sum(1 for i in batch if "pull_request" in i)
        issues_in_batch = len(batch) - prs_in_batch
        print(f"     📄 Page {page}: {len(batch)} items fetched ({issues_in_batch} issues, {prs_in_batch} PRs)")

        if len(batch) < 100:
            break
        page += 1

    real_issues = [i for i in issues if "pull_request" not in i]
    print(f"  ✅ Total raw items : {len(issues)} | After filtering PRs : {len(real_issues)} open issues\n")
    return real_issues


def get_issue_timeline(repo, issue_number, token):
    """Fetch full timeline for an issue (up to 500 events)."""
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
    """Fetch all comments on an issue."""
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


# ---------------------------------------------------------------------------
# PR merge check
# ---------------------------------------------------------------------------

def get_linked_prs(repo, token, timeline):
    """Return list of (pr_number, pr_url) tuples linked via cross-reference events."""
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
    """
    Return (is_merged, merged_into_repo).
    Checks the PR's merge_commit_sha and base repo to confirm it merged
    into OUR repository (not a fork).
    """
    url  = f"https://api.github.com/repos/{repo}/pulls/{pr_number}"
    data = api_request(url, token)
    if not data:
        return False, False

    merged    = data.get("merged", False)
    base_repo = data.get("base", {}).get("repo", {}).get("full_name", "")
    merged_into_ours = (base_repo == repo)

    return merged, (merged and merged_into_ours)


# ---------------------------------------------------------------------------
# Commenter helpers
# ---------------------------------------------------------------------------

def get_commenters(timeline, repo_owner, exclude_logins=None):
    """Return list of commenter logins, filtered to humans (no bots, no owner)."""
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
    """Check if we already posted an open-call comment to avoid spam."""
    marker = "<!-- unassignbot-open-call -->"
    return any(marker in c.get("body", "") for c in comments)


def already_posted_close_notice(comments):
    """Check if we already posted a merge-close notice."""
    marker = "<!-- unassignbot-pr-merged-close -->"
    return any(marker in c.get("body", "") for c in comments)


# ---------------------------------------------------------------------------
# Main schedule handler
# ---------------------------------------------------------------------------

def handle_schedule(repo, token):
    issues  = get_all_open_issues(repo, token)
    now     = datetime.now(timezone.utc)
    owner   = repo.split("/")[0]

    print(f"\n{'='*60}")
    print(f"  📋 Total open issues fetched : {len(issues)}")
    print(f"  🕐 Current UTC time          : {now.strftime('%Y-%m-%d %H:%M:%S')} UTC")
    print(f"{'='*60}\n")

    # Counters
    cnt_no_assignee     = 0
    cnt_open_call       = 0
    cnt_pr_merged_close = 0
    cnt_pr_linked_skip  = 0
    cnt_owner_skip      = 0
    cnt_reminded        = 0
    cnt_unassigned      = 0
    cnt_ok              = 0

    for issue in issues:
        assignees    = issue.get("assignees", [])
        issue_number = issue["number"]
        issue_title  = issue.get("title", "(no title)")

        print(f"\n  🔍 #{issue_number:>5}  \"{issue_title[:60]}\"")

        # ── Fetch timeline ──────────────────────────────────────────────────
        timeline = get_issue_timeline(repo, issue_number, token)
        if not timeline:
            print(f"           → SKIP: could not fetch timeline")
            continue

        # ── Collect commenters ──────────────────────────────────────────────
        assignee_logins = [a["login"] for a in assignees]
        commenters      = get_commenters(timeline, owner, exclude_logins=assignee_logins)

        # ── CASE 1: No assignee — ping all commenters ───────────────────────
        if not assignees:
            cnt_no_assignee += 1
            print(f"           ⬜ No assignees")

            if commenters:
                # Check we haven't already posted the open-call comment
                existing_comments = get_issue_comments(repo, issue_number, token)
                if not already_posted_open_call(existing_comments):
                    ping_str  = " ".join(f"@{u}" for u in commenters)
                    body = (
                        "<!-- unassignbot-open-call -->\n"
                        f"👋 This issue currently has **no assignee**. "
                        f"Is anyone interested in working on it?\n\n"
                        f"{ping_str} — if you'd like to take this, "
                        f"please reply with `/assign` or `/claim` to get assigned! 🙌"
                    )
                    api_request(
                        f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments",
                        token, method="POST", data={"body": body}
                    )
                    cnt_open_call += 1
                    print(f"           📢 OPEN-CALL posted → pinged: {', '.join(commenters)}")
                else:
                    print(f"           📢 Open-call already posted, skipping")
            else:
                print(f"           → No commenters to ping")
            continue

        # ── CASE 2: Has assignee(s) — check for linked PRs ─────────────────
        print(f"           Assignee(s): {', '.join(assignee_logins)}")

        linked_prs = get_linked_prs(repo, token, timeline)

        if linked_prs:
            print(f"           🔗 Linked PR(s): {[n for n, _ in linked_prs]}")

            # Check if ANY linked PR is merged into our repo
            merged_pr = None
            for pr_number, pr_url in linked_prs:
                is_merged, merged_into_ours = check_pr_merged(repo, token, pr_number)
                print(f"              PR #{pr_number}: merged={is_merged}, into_our_repo={merged_into_ours}")
                if merged_into_ours:
                    merged_pr = pr_number
                    break

            if merged_pr:
                # Close the issue
                existing_comments = get_issue_comments(repo, issue_number, token)
                if not already_posted_close_notice(existing_comments):
                    body = (
                        "<!-- unassignbot-pr-merged-close -->\n"
                        f"✅ **Closing this issue automatically.**\n\n"
                        f"Linked PR #{merged_pr} has been merged into `{repo}`. "
                        f"Great work {' '.join(f'@{a}' for a in assignee_logins)}! 🎉\n\n"
                        f"*If this was closed by mistake, please reopen.*"
                    )
                    api_request(
                        f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments",
                        token, method="POST", data={"body": body}
                    )
                    api_request(
                        f"https://api.github.com/repos/{repo}/issues/{issue_number}",
                        token, method="PATCH",
                        data={"state": "closed", "state_reason": "completed"}
                    )
                    cnt_pr_merged_close += 1
                    print(f"           ✅ CLOSED — PR #{merged_pr} merged into {repo}")
                else:
                    print(f"           ✅ Already closed via merged PR, skipping")
            else:
                # PR linked but not merged — don't unassign
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

            # Find latest assignment event
            assigned_at_str = None
            for event in reversed(timeline):
                if event.get("event") == "assigned" and event.get("assignee", {}).get("login") == login:
                    assigned_at_str = event.get("created_at")
                    break

            if not assigned_at_str:
                assigned_at_str = issue.get("created_at")
                print(f"           ℹ️  @{login}: no assignment event found, using issue creation date")

            if assigned_at_str:
                assigned_at   = datetime.strptime(assigned_at_str, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
                days_assigned = (now - assigned_at).days
                print(f"           👤 @{login}: assigned {days_assigned} day(s) ago ({assigned_at_str})")

                if days_assigned >= 7:
                    assignees_to_remove.append(login)
                    print(f"              🔴 QUEUED FOR UNASSIGN (>= 7 days, no PR)")
                elif days_assigned == 5:
                    existing_comments = get_issue_comments(repo, issue_number, token)
                    already_reminded  = any(
                        f"@{login}" in c.get("body", "") and
                        "you have been assigned to this issue for 5 days" in c.get("body", "")
                        for c in existing_comments
                    )
                    if not already_reminded:
                        body = (
                            f"Just a friendly reminder @{login}: you have been assigned to this issue for 5 days. "
                            f"Please submit a PR and mention this issue soon, or you will be unassigned in 2 days."
                        )
                        api_request(
                            f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments",
                            token, method="POST", data={"body": body}
                        )
                        cnt_reminded += 1
                        print(f"              🟡 REMINDER POSTED (day 5 warning)")
                    else:
                        print(f"              🟡 Day 5 — reminder already posted, skipping")
                else:
                    cnt_ok += 1
                    days_left = 7 - days_assigned
                    print(f"              🟢 OK — {days_left} day(s) remaining before unassign")

        if assignees_to_remove:
            api_request(
                f"https://api.github.com/repos/{repo}/issues/{issue_number}/assignees",
                token, method="DELETE", data={"assignees": assignees_to_remove}
            )
            cnt_unassigned += len(assignees_to_remove)

            # Ping commenters as next-in-queue
            ping_list = [f"@{u}" for u in commenters if u not in assignees_to_remove]
            ping_msg  = f" Pinging next in queue: {', '.join(ping_list)}." if ping_list else ""

            body = (
                f"The previous assignee(s) **{', '.join(assignees_to_remove)}** have been unassigned "
                f"due to 7 days of inactivity (no PR submitted).{ping_msg} "
                f"If you are still interested, please reply with `/assign` or `/claim` to claim it."
            )
            api_request(
                f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments",
                token, method="POST", data={"body": body}
            )
            print(f"           ✅ UNASSIGNED: {', '.join(assignees_to_remove)}")

    # ── Final summary ───────────────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"  📊 RUN SUMMARY")
    print(f"{'='*60}")
    print(f"  Total issues scanned       : {len(issues)}")
    print(f"  ⬜ No assignee             : {cnt_no_assignee}")
    print(f"  📢 Open-call comments sent : {cnt_open_call}")
    print(f"  ✅ Closed (PR merged)      : {cnt_pr_merged_close}")
    print(f"  🔗 PR linked, not merged   : {cnt_pr_linked_skip}")
    print(f"  👑 Owner skipped           : {cnt_owner_skip}")
    print(f"  🟢 Active (within 7d)      : {cnt_ok}")
    print(f"  🟡 Reminders sent          : {cnt_reminded}")
    print(f"  🔴 Unassigned              : {cnt_unassigned}")
    print(f"{'='*60}\n")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    token      = os.environ.get("GITHUB_TOKEN")
    repo       = os.environ.get("GITHUB_REPOSITORY")
    event_name = os.environ.get("GITHUB_EVENT_NAME")

    if not token or not repo:
        print("Missing required environment variables (GITHUB_TOKEN, GITHUB_REPOSITORY).")
        return

    if event_name in ["schedule", "workflow_dispatch"]:
        print("🤖 Running scheduled unassign checks...")
        handle_schedule(repo, token)
    else:
        print(f"Unsupported event: {event_name}")

if __name__ == "__main__":
    main()
