import importlib
import os
import sys
import types
import unittest
from unittest.mock import Mock, patch


class RunWorkflowConfigTests(unittest.TestCase):
    def load_run_workflow(self, requests_module=None):
        fake_requests = requests_module or types.SimpleNamespace(get=Mock(), post=Mock())
        sys.modules.pop("run_workflow", None)

        with patch.dict(sys.modules, {"requests": fake_requests}):
            import run_workflow

            return importlib.reload(run_workflow)

    def test_default_api_url_is_localhost_8000(self):
        with patch.dict(os.environ, {}, clear=False):
            os.environ.pop("AI_REEL_API_URL", None)
            run_workflow = self.load_run_workflow()

            self.assertEqual(run_workflow.get_api_url(), "http://localhost:8000")

    def test_api_url_can_be_overridden_from_environment(self):
        with patch.dict(os.environ, {"AI_REEL_API_URL": "http://api.test:9000"}):
            run_workflow = self.load_run_workflow()

            self.assertEqual(run_workflow.get_api_url(), "http://api.test:9000")

    def test_make_request_uses_configured_api_url(self):
        fake_response = Mock()
        fake_response.json.return_value = {"status": "success", "ok": True}
        fake_get = Mock(return_value=fake_response)
        fake_requests = types.SimpleNamespace(get=fake_get, post=Mock())

        with patch.dict(os.environ, {"AI_REEL_API_URL": "http://api.test"}):
            run_workflow = self.load_run_workflow(requests_module=fake_requests)
            result = run_workflow.make_request("/status", max_retries=1)

        self.assertEqual(result, {"status": "success", "ok": True})
        fake_get.assert_called_once_with("http://api.test/status")


if __name__ == "__main__":
    unittest.main()
