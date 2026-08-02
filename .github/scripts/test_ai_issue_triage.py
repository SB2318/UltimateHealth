import unittest
from unittest.mock import patch, MagicMock
import ai_issue_triage

class TestAIIssueTriage(unittest.TestCase):
    @patch('ai_issue_triage.fetch_issue')
    @patch('ai_issue_triage.remove_assignee')
    @patch('ai_issue_triage.post_comment')
    def test_handle_issue_labeled_duplicate(self, mock_post_comment, mock_remove_assignee, mock_fetch_issue):
        # Setup mock issue
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

if __name__ == '__main__':
    unittest.main()
