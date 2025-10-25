"""
Setting image schema for request validation.
"""

from pydantic import BaseModel


class SettingImageRequest(BaseModel):
    """Request model for setting image creation."""
    prompt: str
