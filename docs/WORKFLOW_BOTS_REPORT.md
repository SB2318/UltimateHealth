# GitHub Workflow & Bot Architecture Report

This report outlines all active automation bots in the repository, detailing their core responsibilities, triggers, and the specific GitHub API endpoints they consume.

## 1. AI Issue Triage & Assignment Bot (`ai_issue_triage.py`)
**Primary Role:** Handles the complete lifecycle of issue assignment, triage, and contributor PR validation.
* **Tasks:**
  * **AI Triage:** Evaluates newly opened issues using Gemini AI to determine if they are suitable for frontend community contribution.
  * **Auto-Assignment:** Automatically assigns the issue author if they have no other active assignments.
  * **Comment Processing:** Safely handles `/assign`, `/claim`, and `/unassign` commands from users.
  * **Contributor Validation:** Verifies that a user does not have other active assignments, and ensures their past assignments successfully resulted in a linked PR.
  * **State Management:** Unassigns users if an issue is manually labeled `duplicate`/`invalid` or closed without a PR.
* **GitHub API Usage:**
  * `GET /repos/{owner}/{repo}/issues/{issue_number}` — Fetch issue data
  * `GET /search/issues` — Query active assignments and past issue history
  * `GET /repos/{owner}/{repo}/commits` — Check commits for PR references
  * `GET /repos/{owner}/{repo}/issues/{issue_number}/timeline` — Fetch event timeline
  * `POST /repos/{owner}/{repo}/issues/{issue_number}/comments` — Post AI decisions and instructions
  * `POST /repos/{owner}/{repo}/issues/{issue_number}/assignees` — Assign a user
  * `DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees` — Unassign a user

## 2. Inactive Assignment Cleanup Bot (`remove_old_assignment.py`)
**Primary Role:** Enforces the 7-day completion rule for assigned issues to keep the project moving.
* **Tasks:**
  * **Scheduled Scan:** Runs daily (`0 0 * * *`) to scan all open, assigned issues. (It paginates automatically, reliably fetching 200+ issues if present).
  * **5-Day Warning:** Posts a reminder comment to assignees when they hit 5 days without linking a PR.
  * **7-Day Unassignment:** Safely removes the assignee if 7 days have passed without a linked PR.
  * **Queue Pinging:** When unassigning, it pings other users who previously commented on the issue to let them know it's available.
* **GitHub API Usage:**
  * `GET /repos/{owner}/{repo}/issues?state=open` — Fetch all open issues
  * `GET /repos/{owner}/{repo}/issues/{issue_number}/timeline` — Paginated fetch (up to 500 events) to find the exact timestamp of the user's assignment event.
  * `POST /repos/{owner}/{repo}/issues/{issue_number}/comments` — Post warnings and unassignment notifications
  * `DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees` — Remove the assignee

## 3. PR Assignment Security Check (`pr_assignment_check.py`)
**Primary Role:** Prevents "PR Sniping" (users submitting PRs for issues assigned to someone else).
* **Tasks:**
  * Parses newly opened PRs to find the referenced issue (e.g., `Fixes #123`).
  * Validates that the PR author matches the user actually assigned to the referenced issue.
  * Automatically closes the PR and issues a warning if the author is unauthorized.
* **GitHub API Usage:**
  * `GET /repos/{owner}/{repo}/issues/{issue_number}` — Check who is assigned to the linked issue
  * `POST /repos/{owner}/{repo}/issues/{pr_number}/comments` — Warn the unauthorized contributor
  * `PATCH /repos/{owner}/{repo}/pulls/{pr_number}` — Close the unauthorized PR

## 4. Issue Resolution Bot (`issue-resolution-bot.yml`)
**Primary Role:** Automatically closes issues when a resolving commit is merged.
* **Tasks:**
  * Runs on a schedule to scan the default branch's recent commits.
  * Looks for closure keywords in commit messages, supporting many variations like `fixes #123`, `Closes#123`, `#closes #123`, or even just `#123`.
  * Posts a resolution comment and closes the issue.
* **GitHub API Usage (via `github.rest` JS):**
  * `github.rest.issues.listForRepo` — Fetch issues
  * `github.rest.repos.listCommits` — Fetch main branch commits
  * `github.rest.issues.createComment` — Post resolution message
  * `github.rest.issues.update` — Change issue state to `closed`

## 5. Gemini AI PR Reviewers (`ai_reviewer.py` & `automated_reviewer.py`)
**Primary Role:** Provides code reviews using the Gemini AI API.
* **Tasks:**
  * **Manual (`ai_reviewer`):** Triggered by maintainers typing `/review` on a PR comment.
  * **Automated (`automated_reviewer`):** Runs on PR creation/update to automatically check code diffs.
* **GitHub API Usage:**
  * `GET /repos/{owner}/{repo}/pulls/{pr_number}` — Fetch PR details and diff URLs
  * `GET /repos/{owner}/{repo}/pulls/{pr_number}/commits` — Analyze PR commits
  * `POST /repos/{owner}/{repo}/issues/{pr_number}/comments` — Post detailed AI code review

## 6. Mentor / Community bots (`mentor.yml` & `autocomment-iss-close.yml`)
**Primary Role:** Community management and reviewer assignment.
* **Tasks:**
  * **Mentor:** Assigns specific reviewers and labels to PRs based on the file paths modified.
  * **Auto-Close:** Thanks contributors automatically when an issue is closed.
* **GitHub API Usage (via `github.rest` JS):**
  * `github.rest.pulls.requestReviewers` — Request maintainer reviews
  * `github.rest.issues.addLabels` / `addAssignees` — Categorize and assign
  * `github.rest.issues.createComment` — Post thank you messages
