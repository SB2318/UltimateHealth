import os
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone
import re

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
        if hasattr(e, 'read'):
            print(e.read().decode("utf-8"))
        return None

def get_all_open_issues(repo, token):
    issues = []
    page = 1
    while True:
        url = f"https://api.github.com/repos/{repo}/issues?state=open&per_page=100&page={page}"
        batch = api_request(url, token)
        if not batch:
            break
        issues.extend(batch)
        if len(batch) < 100:
            break
        page += 1
    # Filter out pull requests
    return [issue for issue in issues if "pull_request" not in issue]

def handle_schedule(repo, token):
    issues = get_all_open_issues(repo, token)
    now = datetime.now(timezone.utc)

    print(f"\n{'='*60}")
    print(f"  📋 Total open issues fetched : {len(issues)}")
    print(f"  🕐 Current UTC time          : {now.strftime('%Y-%m-%d %H:%M:%S')} UTC")
    print(f"{'='*60}\n")

    skipped_no_assignee  = 0
    skipped_pr_linked    = 0
    skipped_owner        = 0
    reminded_count       = 0
    unassigned_count     = 0
    ok_count             = 0

    for issue in issues:
        assignees = issue.get("assignees", [])
        issue_number = issue["number"]
        issue_title  = issue.get("title", "(no title)")

        if not assignees:
            skipped_no_assignee += 1
            print(f"  ⬜ #{issue_number:>5}  \"{issue_title[:55]}\"")
            print(f"           → SKIP: no assignees")
            continue

        print(f"\n  🔍 #{issue_number:>5}  \"{issue_title[:55]}\"")
        print(f"           Assignee(s): {', '.join(a['login'] for a in assignees)}")

        # Fetch timeline
        timeline = []
        page = 1
        while page <= 5:
            timeline_url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/timeline?per_page=100&page={page}"
            batch = api_request(timeline_url, token)
            if not batch:
                break
            timeline.extend(batch)
            if len(batch) < 100:
                break
            page += 1

        if not timeline:
            print(f"           → SKIP: could not fetch timeline")
            continue

        # Determine if a PR is linked
        pr_linked = False
        for event in timeline:
            if event.get("event") == "cross-referenced":
                source = event.get("source", {})
                if source.get("type") == "issue" and "pull_request" in source.get("issue", {}):
                    pr_linked = True
                    break

        if pr_linked:
            skipped_pr_linked += 1
            print(f"           → SKIP: linked PR exists, no unassignment needed")
            continue

        # Collect all unique commenters (for ping queue)
        commenters = set()
        for event in timeline:
            if event.get("event") == "commented":
                actor = event.get("actor", {}).get("login")
                if actor:
                    commenters.add(actor)

        # Check each assignee
        assignees_to_remove = []
        for assignee in assignees:
            login = assignee["login"]
            if login == "SB2318":
                skipped_owner += 1
                print(f"           → SKIP assignee @{login}: owner, never unassigned")
                continue

            # Find the latest assignment event for this user
            assigned_at_str = None
            for event in reversed(timeline):
                if event.get("event") == "assigned" and event.get("assignee", {}).get("login") == login:
                    assigned_at_str = event.get("created_at")
                    break

            if not assigned_at_str:
                assigned_at_str = issue.get("created_at")
                print(f"           ℹ️  @{login}: no assignment event found, falling back to issue creation date")

            if assigned_at_str:
                assigned_at  = datetime.strptime(assigned_at_str, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
                days_assigned = (now - assigned_at).days
                print(f"           👤 @{login}: assigned {days_assigned} day(s) ago ({assigned_at_str})")

                if days_assigned >= 7:
                    assignees_to_remove.append(login)
                    print(f"              🔴 QUEUED FOR UNASSIGN (>= 7 days, no PR)")
                elif days_assigned == 5:
                    already_reminded = any(
                        e.get("event") == "commented" and
                        "you have been assigned to this issue for 5 days" in e.get("body", "") and
                        f"@{login}" in e.get("body", "")
                        for e in timeline
                    )
                    if not already_reminded:
                        body = f"Just a friendly reminder @{login}: you have been assigned to this issue for 5 days. Please submit a PR and mention this issue soon, or you will be unassigned in 2 days."
                        api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": body})
                        reminded_count += 1
                        print(f"              🟡 REMINDER POSTED (day 5 warning)")
                    else:
                        print(f"              🟡 Day 5 — reminder already posted, skipping")
                else:
                    ok_count += 1
                    days_left = 7 - days_assigned
                    print(f"              🟢 OK — {days_left} day(s) remaining before unassign")

        if assignees_to_remove:
            api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/assignees", token, method="DELETE", data={"assignees": assignees_to_remove})
            unassigned_count += len(assignees_to_remove)

            # Ping queue
            ping_list = []
            owner = repo.split('/')[0]
            for user in commenters:
                if user not in assignees_to_remove and user != owner and user != "SB2318" and "bot" not in user.lower():
                    ping_list.append(f"@{user}")

            ping_msg = ""
            if ping_list:
                ping_msg = f" Pinging next in queue: {', '.join(ping_list)}."

            body = f"The previous assignee(s) have been unassigned due to 7 days of inactivity (no PR submitted).{ping_msg} If you are still interested, please reply with `/assign` or `/claim` to claim it."
            api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": body})
            print(f"           ✅ UNASSIGNED: {', '.join(assignees_to_remove)}")

    print(f"\n{'='*60}")
    print(f"  📊 RUN SUMMARY")
    print(f"{'='*60}")
    print(f"  Total issues scanned   : {len(issues)}")
    print(f"  ⬜ No assignees (skip) : {skipped_no_assignee}")
    print(f"  🔗 PR linked (skip)    : {skipped_pr_linked}")
    print(f"  👑 Owner skipped       : {skipped_owner}")
    print(f"  🟢 Active (within 7d)  : {ok_count}")
    print(f"  🟡 Reminders sent      : {reminded_count}")
    print(f"  🔴 Unassigned          : {unassigned_count}")
    print(f"{'='*60}\n")


def main():
    token      = os.environ.get("GITHUB_TOKEN")
    repo       = os.environ.get("GITHUB_REPOSITORY")
    event_name = os.environ.get("GITHUB_EVENT_NAME")
    event_path = os.environ.get("GITHUB_EVENT_PATH")

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
