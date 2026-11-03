import unittest
from unittest.mock import patch, MagicMock
import ai_issue_triage

class TestAIIssueTriage(unittest.TestCase):
    @patch('ai_issue_triage.fetch_issue')
    @patch('ai_issue_triage.remove_assignee')
    @patch('ai_issue_triage.post_comment')
    def test_handle_issue_labeled_duplicate(self, mock_post_comment, mock_remove_assignee, mock_fetch_issue):
        mock_fetch_issue.return_value = {
            "assignees": [{"login": "user1"}],
            "labels": [{"name": "bug"}]
        }
        
        status, detail = ai_issue_triage.handle_issue_labeled("repo", "123", "duplicate", "token")
        
        self.assertEqual(status, "unassigned")
        mock_remove_assignee.assert_called_with("repo", "123", "user1", "token")
        mock_post_comment.assert_called()

    @patch('ai_issue_triage.fetch_issue')
    @patch('ai_issue_triage.remove_assignee')
    def test_handle_issue_labeled_preserve_assignment(self, mock_remove_assignee, mock_fetch_issue):
        mock_fetch_issue.return_value = {
            "assignees": [{"login": "user1"}],
            "labels": [{"name": "preserve-assignment"}]
        }
        
        status, detail = ai_issue_triage.handle_issue_labeled("repo", "123", "invalid", "token")
        
        self.assertEqual(status, "ignored")
        self.assertEqual(detail, "Assignment preserved by maintainer")
        mock_remove_assignee.assert_not_called()

    @patch('ai_issue_triage.fetch_issue')
    @patch('ai_issue_triage.remove_assignee')
    @patch('ai_issue_triage.post_comment')
    @patch('ai_issue_triage.check_pr_references_assigned_issue')
    def test_handle_issue_closed_no_pr(self, mock_check_pr, mock_post_comment, mock_remove_assignee, mock_fetch_issue):
        mock_fetch_issue.return_value = {
            "assignees": [{"login": "user1"}],
            "labels": [{"name": "bug"}]
        }
        mock_check_pr.return_value = False
        
        status, detail = ai_issue_triage.handle_issue_closed("repo", "123", "token")
        
        self.assertEqual(status, "processed")
        mock_remove_assignee.assert_called_with("repo", "123", "user1", "token")
        mock_post_comment.assert_called()

    @patch('ai_issue_triage.fetch_issue')
    @patch('ai_issue_triage.remove_assignee')
    @patch('ai_issue_triage.check_pr_references_assigned_issue')
    def test_handle_issue_closed_with_pr(self, mock_check_pr, mock_remove_assignee, mock_fetch_issue):
        mock_fetch_issue.return_value = {
            "assignees": [{"login": "user1"}],
            "labels": [{"name": "bug"}]
        }
        mock_check_pr.return_value = True
        
        status, detail = ai_issue_triage.handle_issue_closed("repo", "123", "token")
        
        self.assertEqual(status, "processed")
        mock_remove_assignee.assert_not_called()

    @patch('ai_issue_triage.fetch_repo_milestones')
    @patch('ai_issue_triage.assign_milestone')
    def test_try_link_milestone(self, mock_assign, mock_fetch):
        mock_fetch.return_value = [
            {"number": 1, "title": "v1.0 Release Hardening"},
            {"number": 2, "title": "Content & Admin Operations"}
        ]
        
        matched_id = ai_issue_triage.try_link_milestone("repo", "123", "v1.0 Release Hardening", "token")
        self.assertEqual(matched_id, 1)
        mock_assign.assert_called_with("repo", "123", 1, "token")

    @patch('ai_issue_triage.fetch_issue')
    @patch('ai_issue_triage.call_gemini')
    @patch('ai_issue_triage.post_comment')
    def test_handle_scope_command(self, mock_post_comment, mock_gemini, mock_fetch):
        mock_fetch.return_value = {"title": "New Wellness Widget", "body": "Need a widget for tracking"}
        mock_gemini.return_value = {"text": "Phase 1: Build the UI component. Phase 2: Connect to storage."}
        
        status, detail = ai_issue_triage.handle_issue_comment(
            "repo", "123", "dev_user", "/scope please suggest breakdown", "token", gemini_api_keys=["fake-key"]
        )
        self.assertEqual(status, "responded")
        mock_post_comment.assert_called()

    @patch('ai_issue_triage.fetch_issue')
    @patch('ai_issue_triage.call_gemini')
    @patch('ai_issue_triage.try_link_milestone')
    @patch('ai_issue_triage.post_comment')
    def test_handle_milestone_command(self, mock_post_comment, mock_link_milestone, mock_gemini, mock_fetch):
        mock_fetch.return_value = {"title": "Bug in auth screen", "body": "Login fails on safari"}
        mock_gemini.return_value = {"milestone": "v1.0 Release Hardening", "reasoning": "Auth fix needed for launch."}
        mock_link_milestone.return_value = 1
        
        status, detail = ai_issue_triage.handle_issue_comment(
            "repo", "123", "dev_user", "/milestone", "token", gemini_api_keys=["fake-key"]
        )
        self.assertEqual(status, "responded")
        mock_post_comment.assert_called()

if __name__ == '__main__':
    unittest.main()
