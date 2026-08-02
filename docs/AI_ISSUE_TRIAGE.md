# AI Issue Triage Bot Workflow

This repository uses an AI Issue Triage Bot powered by Google Gemini and GitHub Actions to streamline the issue triage process, ensure issues are appropriately categorized, and handle the assignment of contributors.

## Triggers

The bot is triggered by several events on issues:
* `opened` - when a new issue is submitted.
* `comment_created` - when a contributor comments on an issue.
* `labeled` - when a label is added to the issue.
* `closed` - when an issue is closed.

## Triage Process

When a new issue is opened, the bot will:
1. Validate the issue to ensure it has enough information (e.g., clear problem statement, reproduction steps).
2. Check if the issue is in scope for the project.
3. Automatically classify the issue (e.g., frontend, backend) and assign a difficulty level (beginner, intermediate, advanced, critical).
4. Perform duplicate detection against all existing repository issues.
5. If the issue is a frontend issue, it will be opened up for community contribution.

## Contributor Assignment

Contributors can request assignment to open frontend issues by commenting on the issue.
The bot will check the following:
* The contributor must not have any other active assigned issues in the repository.
* If they have previously been assigned issues, they must have submitted a Pull Request that references the assigned issue before they can be assigned a new one.

## Unassignment Functionality

To keep issue assignments accurate and unblock potential contributors, the bot includes automatic unassignment functionality in the following scenarios:

### Issue Labeled

If an issue is given a label indicating that it will not be completed or is invalid, the bot will automatically unassign the current assignee(s) so they are freed up to take on other issues. This triggers on any of the following labels:
* `not planned`
* `duplicate`
* `invalid`
* `won't fix`
* `wontfix`

### Issue Closed

If an issue is closed, the bot will check if the assignee(s) have a linked Pull Request associated with the issue. If no Pull Request is found, it is assumed the work was not completed or the issue was closed before work began, and the contributor will be unassigned.

### Maintainer Override (Preserve Assignment)

To prevent the bot from automatically unassigning contributors in cases where a maintainer wants to lock or preserve the assignment, a maintainer can apply the **`preserve-assignment`** label to the issue. If this label is present, the bot will ignore all unassignment triggers for that issue.
