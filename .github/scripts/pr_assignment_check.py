import os
import re
import json
import urllib.request
import sys

def make_request(url, method="GET", data=None, token=None):
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "PR-Assignment-Check-Bot"
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
        
    req = urllib.request.Request(url, method=method, headers=headers)
    if data:
        req.data = json.dumps(data).encode("utf-8")
        req.add_header("Content-Type", "application/json")
        
    try:
        with urllib.request.urlopen(req) as response:
            resp = response.read().decode("utf-8")
            return json.loads(resp) if resp else {}
    except Exception as e:
        print(f"Request failed for {url}: {e}")
        return None

def main():
    token = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPOSITORY")
    event_path = os.environ.get("GITHUB_EVENT_PATH")

    if not token or not repo or not event_path:
        print("Missing environment variables.")
        sys.exit(1)

    with open(event_path, "r") as f:
        event_data = json.load(f)

    pr = event_data.get("pull_request")
    if not pr:
        print("Not a pull request event.")
        sys.exit(0)

    pr_author = pr.get("user", {}).get("login")

    # Do not block maintainers, collaborators, or the mentor (SB2318)
    author_assoc = pr.get("author_association", "")
    if author_assoc in ["OWNER", "MEMBER", "COLLABORATOR"] or (pr_author and pr_author.lower() == "sb2318"):
        print(f"Author {pr_author} is a maintainer/mentor (assoc: {author_assoc}). Skipping assignment check.")
        sys.exit(0)

    pr_number = pr.get("number")
    pr_title = pr.get("title", "")
    pr_body = pr.get("body", "") or ""

    # Extract issue numbers using standard GitHub closing keywords
    # Matches: "fixes #123", "close #123", "Resolves #123", etc.
    keyword_re = re.compile(r'(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)', re.IGNORECASE)
    
    # Check both title and body
    combined_text = f"{pr_title}\n{pr_body}"
    issue_numbers = set(re.findall(keyword_re, combined_text))

    if not issue_numbers:
        print("No linked issues found with closing keywords. Skipping assignment check.")
        sys.exit(0)

    print(f"Found linked issues: {issue_numbers}")

    for issue_num in issue_numbers:
        url = f"https://api.github.com/repos/{repo}/issues/{issue_num}"
        issue = make_request(url, token=token)
        if not issue:
            print(f"Could not fetch issue #{issue_num}.")
            continue
            
        assignees = [a.get("login") for a in issue.get("assignees", [])]
        
        # If the PR author is not assigned to the issue they are trying to fix
        if pr_author not in assignees:
            print(f"@{pr_author} is NOT assigned to issue #{issue_num}.")
            
            # Post the instructional comment requested by the user
            comment_body = (
                f"Hi @{pr_author}, it looks like you are trying to fix #{issue_num} but you are not assigned to it.\n\n"
                "**The correct workflow is:**\n\n"
                "1. Submit your PR for the issue currently assigned to you.\n"
                "2. Once that's done, comment on the new issue you'd like to work on.\n"
                "3. Wait for our GitHub bot to assign the issue to you.\n"
                "4. Only after the assignment is confirmed should you start working and create a PR.\n\n"
                "This process ensures that issues are assigned fairly and prevents multiple contributors from working on the same issue simultaneously.\n\n"
                "Because of this, I will be closing this Pull Request. Once you are officially assigned to the issue, you may reopen or resubmit it. Thank you for understanding!"
            )
            
            comment_url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
            make_request(comment_url, method="POST", data={"body": comment_body}, token=token)
            
            # Close the PR
            close_url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}"
            make_request(close_url, method="PATCH", data={"state": "closed"}, token=token)
            
            print("PR closed. Exiting.")
            sys.exit(0)
            
    print("Assignment check passed for all linked issues.")

if __name__ == "__main__":
    main()
