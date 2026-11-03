# AI Issue Triage & Contributor Scope Bot Workflow

This repository uses an AI Issue Triage Bot powered by Google Gemini and GitHub Actions to streamline the issue triage process, ensure issues are appropriately categorized, guide community contributors with scope advice, match proposals to project roadmap milestones, and manage contributor assignments.

---

## 1. Triggers

The bot is triggered by several events on issues and pull requests:
* `issues: [opened]` — when a new issue or proposal is submitted.
* `issue_comment: [created]` — when a contributor comments on an issue (e.g., `/assign`, `/claim`, `/unassign`, `/scope`, `/milestone`).
* `issues: [labeled]` — when a label is added to the issue (e.g. `duplicate`, `not planned`).
* `issues: [closed]` — when an issue is closed.
* `workflow_dispatch` — manual execution targeting a specific issue number.

---

## 2. Triage & Proposal Analysis Process

When a new issue is opened, the bot performs:
1. **Validation:** Checks if the issue contains sufficient information (problem statement, expected behavior, logs/screenshots). If incomplete, it labels the issue `needs-information`.
2. **Duplicate Detection:** Extracts keywords and queries the GitHub Search API across the entire repository history, performing semantic comparison against candidate issues to prevent duplicates.
3. **Scope & Domain Check:** Verifies alignment with UltimateHealth's core scope (health articles, daily wellness logging, podcasts, AI health assistant, analytics).
   * *Doctor & clinical workflows* (consultations, appointments, hospital administration) are deferred to the Future Ecosystem Roadmap.
4. **Classification & Difficulty:** Classifies into `frontend-web`, `frontend-mobile`, `backend`, or `docs`, and assigns difficulty levels (`level:beginner`, `level:intermediate`, `level:advanced`, `level:critical`).
5. **Roadmap Milestone Prediction:**
   Evaluates where the issue fits in the UltimateHealth 2026–2027 roadmap:
   * **`v1.0 Release Hardening`** (Current Phase: Nov 2026 — Production bug fixes, cross-platform UI polish, mobile/web responsiveness, auth stability, performance).
   * **`Content & Admin Operations`** (Phase: Dec 2026 — Article CMS workflows, admin dashboards, article moderation, content discovery).
   * **`ML & Recommendation Pipeline`** (Phase: Early 2027 — Machine learning recommendation algorithms, personalization, health scoring).
   * **`Future Ecosystem / Clinical Workflows`** (Deferred Backlog — Doctor/hospital workflows).
   If matching open GitHub milestones exist, the bot automatically assigns the issue to the milestone.
6. **Proposal & Scope Advisor:**
   For feature requests and proposals, Gemini analyzes feasibility, breaks down large requests into a pragmatic **Phase 1 MVP vs Phase 2**, and highlights architectural guidelines (Tamagui design tokens, QueryClient hooks, TypeScript, test coverage).

---

## 3. Contributor Commands

Contributors can interact with the bot directly via issue comments:

| Command | Action |
| :--- | :--- |
| `/assign` or `/claim` | Evaluates contributor eligibility and assigns the issue. |
| `/unassign` | Unassigns the user and opens the issue back up to the community. |
| `/scope` or `/refine-scope` | Asks the AI bot to analyze the proposal and generate an MVP scope breakdown and file pointers. |
| `/milestone` | Requests an explanation of roadmap placement and auto-links the target milestone if available. |

---

## 4. Contributor Assignment Rules

To keep contributions organized and fair:
* **No Concurrent Active Assignments:** A contributor cannot claim an issue if they already have an active assigned issue.
* **Prior Issue PR Verification:** If a contributor was previously assigned an issue that is now closed, they must have submitted a PR referencing that issue before claiming another.
* **Auto-Assignment on Open:** When an eligible contributor opens a valid frontend or docs issue, the bot automatically assigns it to them.

---

## 5. Unassignment & Issue Lifecycle

* **Issue Labeled (`not planned`, `duplicate`, `invalid`, `won't fix`):** Assignees are automatically unassigned so their assignment quota is freed.
* **Issue Closed Without PR:** If an issue is closed without a linked PR, the assignee is removed.
* **Maintainer Override:** Applying the **`preserve-assignment`** label prevents the bot from unassigning the contributor.
