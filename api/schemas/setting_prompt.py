"""
Setting prompt schema for request validation.
"""

from pydantic import BaseModel


class SettingPromptRequest(BaseModel):
    """Request model for setting prompt creation."""
    description: str
