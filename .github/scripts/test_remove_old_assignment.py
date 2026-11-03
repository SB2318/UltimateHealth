import unittest
from unittest.mock import patch, MagicMock
from datetime import datetime, timezone, timedelta
import remove_old_assignment

class TestRepoIssueGroomer(unittest.TestCase):
    @patch('remove_old_assignment.api_request')
    def test_scan_commits_and_resolve_issues(self, mock_api_request):
        mock_api_request.side_effect = [
            # Commits response
            [
                {
                    "sha": "abcdef123456",
                    "commit": {
                        "message": "fix: resolve login bug Fixes #42",
                        "author": {"name": "TestDev"}
                    }
                }
            ],
            # POST comment response
            {},
            # PATCH close issue response
            {}
        ]
        
        open_issues = {42: {"title": "Login crash on iOS"}}
        resolved_count = remove_old_assignment.scan_commits_and_resolve_issues("repo/test", "token", open_issues)
        
        self.assertEqual(resolved_count, 1)
        self.assertNotIn(42, open_issues)
        self.assertEqual(mock_api_request.call_count, 3)

    @patch('remove_old_assignment.api_request')
    @patch('remove_old_assignment.get_recently_closed_issues')
    def test_audit_closed_issues_cleans_assignees(self, mock_get_closed, mock_api_request):
        mock_get_closed.return_value = [
            {
                "number": 55,
                "assignees": [{"login": "inactive_dev"}],
                "labels": [{"name": "bug"}]
            },
            {
                "number": 56,
                "assignees": [{"login": "dev2"}],
                "labels": [{"name": "preserve-assignment"}]
            }
        ]
        mock_api_request.return_value = {}

        cleaned = remove_old_assignment.audit_closed_issues("repo/test", "token")
        self.assertEqual(cleaned, 1)
        mock_api_request.assert_called_once_with(
            "https://api.github.com/repos/repo/test/issues/55/assignees",
            "token",
            method="DELETE",
            data={"assignees": ["inactive_dev"]}
        )

if __name__ == '__main__':
    unittest.main()
