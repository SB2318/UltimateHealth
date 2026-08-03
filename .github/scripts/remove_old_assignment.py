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
        print(f"API Request failed for {url}: {e}")
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
    
    for issue in issues:
        assignees = issue.get("assignees", [])
        if not assignees:
            continue
            
        issue_number = issue["number"]
        
        # Fetch timeline to get assignment times and PR references
        timeline_url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/timeline"
        timeline = api_request(timeline_url, token)
        if not timeline:
            continue
            
        # Determine if a PR is linked
        pr_linked = False
        for event in timeline:
            if event.get("event") == "cross-referenced":
                source = event.get("source", {})
                if source.get("type") == "issue" and "pull_request" in source.get("issue", {}):
                    pr_linked = True
                    break
        
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
                continue
                
            # Find the latest assignment event for this user
            assigned_at_str = None
            for event in reversed(timeline):
                if event.get("event") == "assigned" and event.get("assignee", {}).get("login") == login:
                    assigned_at_str = event.get("created_at")
                    break
                    
            if not assigned_at_str:
                # Fallback to issue creation time if assignment event not found (rare)
                assigned_at_str = issue.get("created_at")
                
            if assigned_at_str:
                assigned_at = datetime.strptime(assigned_at_str, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
                days_assigned = (now - assigned_at).days
                
                if not pr_linked:
                    if days_assigned >= 7:
                        assignees_to_remove.append(login)
                    elif days_assigned == 5:
                        # Post a reminder (ensure we don't spam it multiple times, check if we already reminded)
                        already_reminded = any(
                            e.get("event") == "commented" and 
                            "you have been assigned to this issue for 5 days" in e.get("body", "") and 
                            f"@{login}" in e.get("body", "") 
                            for e in timeline
                        )
                        if not already_reminded:
                            body = f"Just a friendly reminder @{login}: you have been assigned to this issue for 5 days. Please submit a PR and mention this issue soon, or you will be unassigned in 2 days."
                            api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": body})
        
        if assignees_to_remove:
            # Unassign
            api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/assignees", token, method="DELETE", data={"assignees": assignees_to_remove})
            
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


def handle_issue_comment(repo, token, event_path):
    with open(event_path, "r") as f:
        event = json.load(f)
        
    action = event.get("action")
    if action != "created":
        return
        
    comment = event.get("comment", {})
    body = comment.get("body", "").lower().strip()
    issue = event.get("issue", {})
    issue_number = issue.get("number")
    commenter = comment.get("user", {}).get("login")
    
    assign_match = re.search(r'/(assign|claim)', body)
    unassign_match = re.search(r'/unassign', body)
    
    if assign_match:
        # Check if already assigned
        current_assignees = [a["login"] for a in issue.get("assignees", [])]
        if not current_assignees:
            # Check if they have ANY OTHER open issue assigned
            search_url = f"https://api.github.com/search/issues?q=repo:{repo}+is:open+assignee:{commenter}"
            search_res = api_request(search_url, token)
            active_assignments = search_res.get("total_count", 0) if search_res else 0
            
            if active_assignments > 0:
                reply = f"Sorry @{commenter}, you already have an active assignment in this repository. Please complete or unassign it before claiming a new one."
                api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": reply})
            else:
                # Assign to the commenter
                api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/assignees", token, method="POST", data={"assignees": [commenter]})
                reply = f"Assigned to @{commenter}. You have 7 days to complete this issue. Please submit a PR referencing this issue."
                api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": reply})
        elif commenter in current_assignees:
            pass # Already assigned to them
        else:
            # Optionally notify them it's taken
            pass 
            
    if unassign_match:
        current_assignees = [a["login"] for a in issue.get("assignees", [])]
        if commenter in current_assignees:
            api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/assignees", token, method="DELETE", data={"assignees": [commenter]})
            reply = f"@{commenter} has been unassigned. Anyone else can reply with `/assign` or `/claim` to claim it."
            api_request(f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments", token, method="POST", data={"body": reply})

def main():
    token = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPOSITORY")
    event_name = os.environ.get("GITHUB_EVENT_NAME")
    event_path = os.environ.get("GITHUB_EVENT_PATH")
    
    if not token or not repo:
        print("Missing required environment variables (GITHUB_TOKEN, GITHUB_REPOSITORY).")
        return
        
    if event_name in ["schedule", "workflow_dispatch"]:
        print("Running scheduled unassign checks...")
        handle_schedule(repo, token)
    elif event_name == "issue_comment":
        print("Handling issue comment...")
        if event_path and os.path.exists(event_path):
            handle_issue_comment(repo, token, event_path)
        else:
            print("Missing or invalid GITHUB_EVENT_PATH.")
    else:
        print(f"Unsupported event: {event_name}")

if __name__ == "__main__":
    main()
