# GitHub Workflow & Bot Architecture Report

This report outlines all active automation bots in the repository, detailing their core responsibilities, triggers, and the specific GitHub API endpoints they consume.

---

## 1. AI Issue Triage & Contributor Scope Bot (`ai_issue_triage.py`)
**Primary Role:** Handles the complete lifecycle of issue assignment, triage, proposal scoping, roadmap milestone prediction, and contributor interactions.
* **Tasks:**
  * **AI Triage & Validation:** Evaluates newly opened issues using Gemini AI for clarity, validity, and scope alignment.
  * **Roadmap Milestone Prediction:** Predicts and auto-links issues to active roadmap milestones (`v1.0 Release Hardening`, `Content & Admin Operations`, `ML & Recommendation Pipeline`, `Future Ecosystem`).
  * **Proposal Scope Advisor:** Generates phased MVP breakdowns (Phase 1 vs Phase 2) and architecture guidelines for feature requests.
  * **Interactive Commands:** Processes `/assign`, `/claim`, `/unassign`, `/scope` (or `/refine-scope`), and `/milestone` directly from issue comments.
  * **Contributor Validation:** Enforces single-active-assignment limits and verifies linked PRs for prior completed assignments.
  * **State Management:** Unassigns users when issues are labeled `duplicate`/`invalid` or closed without a PR, respecting `preserve-assignment`.
* **GitHub API Usage:**
  * `GET /repos/{owner}/{repo}/issues/{issue_number}` — Fetch issue metadata
  * `GET /repos/{owner}/{repo}/milestones?state=open` — Fetch active milestones
  * `PATCH /repos/{owner}/{repo}/issues/{issue_number}` — Update issue state or milestone
  * `GET /search/issues` — Query active assignments and duplicate candidate history
  * `GET /repos/{owner}/{repo}/commits` — Check commits for recent project context
  * `GET /repos/{owner}/{repo}/issues/{issue_number}/timeline` — Fetch event timeline
  * `POST /repos/{owner}/{repo}/issues/{issue_number}/comments` — Post triage decisions, guidance, and command responses
  * `POST /repos/{owner}/{repo}/issues/{issue_number}/assignees` — Assign a contributor
  * `DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees` — Unassign a contributor

---

## 2. Repository & Issue Hygiene Bot (`remove_old_assignment.py` / `remove_old_assignment.yml`)
**Primary Role:** Daily repository grooming, commit resolution detection, inactive assignment cleanup, and closed-issue audit.
* **Tasks:**
  * **Scheduled Scan:** Runs daily at `02:00 UTC` and via `workflow_dispatch`.
  * **Commit Resolution Scanning:** Scans the last 100 commits on `main` for closing keywords (`Fixes #N`, `Closes #N`) and automatically closes corresponding open issues.
  * **Stale Needs-Information Check:** Auto-closes open issues labeled `needs-information` that have been inactive for over 14 days.
  * **PR Merge Close:** Detects merged linked PRs and automatically closes the issue with completion notes.
  * **5-Day Warning & 7-Day Unassignment:** Sends reminders at 5 days of assignment inactivity and safely unassigns at 7 days without a linked PR.
  * **Open-Call Pinging:** Notifies previous commenters when an issue becomes available.
  * **Closed Issues Audit:** Wipes lingering assignees from closed issues so contributor quotas remain accurate.
* **GitHub API Usage:**
  * `GET /repos/{owner}/{repo}/issues?state=open` — Fetch all open issues (paginated)
  * `GET /repos/{owner}/{repo}/issues?state=closed` — Fetch recently closed issues for assignee cleanup
  * `GET /repos/{owner}/{repo}/commits` — Fetch default branch commits
  * `GET /repos/{owner}/{repo}/issues/{issue_number}/timeline` — Paginated fetch (up to 500 events) for assignment and cross-reference events
  * `POST /repos/{owner}/{repo}/issues/{issue_number}/comments` — Post warnings, resolution comments, and unassignment notifications
  * `PATCH /repos/{owner}/{repo}/issues/{issue_number}` — Close resolved issues
  * `DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees` — Remove assignees

---

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

---

## 4. Gemini AI PR Reviewers (`ai_reviewer.py` & `automated_reviewer.py`)
**Primary Role:** Provides automated and on-demand code reviews using the Gemini AI API.
* **Tasks:**
  * **Automated (`automated_reviewer`):** Runs on PR creation/update to validate PR linkages and analyze code diffs with severity grouping (Critical, Important, Suggestions). Marks reviewed PRs with `ai-reviewed`.
  * **Manual (`ai_reviewer`):** Triggered by maintainers typing `/review` on a PR comment.
* **GitHub API Usage:**
  * `GET /repos/{owner}/{repo}/pulls/{pr_number}` — Fetch PR details and diff URLs
  * `GET /repos/{owner}/{repo}/pulls/{pr_number}/commits` — Analyze PR commits
  * `POST /repos/{owner}/{repo}/issues/{pr_number}/comments` — Post detailed AI code review
  * `POST /repos/{owner}/{repo}/issues/{pr_number}/labels` — Apply classification and status labels

---

## 5. Reviewers & Maintainers Automation (`mentor.yml`)
**Primary Role:** Routes pull requests to team leads and maintainers.
* **Tasks:**
  * When team mentors or leads open issues, tags them with `mentor:<username>`.
  * When contributors open PRs targeting `main` or `web` referencing those issues, automatically assigns the mentor as assignee and requested reviewer.
  * Posts a friendly pre-review checklist (linting, type safety, design alignment, responsive testing).
* **GitHub API Usage (via `github.rest` JS):**
  * `github.rest.pulls.requestReviewers` — Request maintainer reviews
  * `github.rest.issues.addLabels` / `addAssignees` — Categorize and assign
  * `github.rest.issues.createComment` — Post checklist comment
