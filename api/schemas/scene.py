"""
Video prompt schema for request validation.
"""

from pydantic import BaseModel


class VideoPromptRequest(BaseModel):
    """Request model for video prompt creation."""
    scene_description: str
