"""
Storyboard schema for request validation.
"""

from pydantic import BaseModel


class StoryboardRequest(BaseModel):
    """Request model for storyboard creation."""
    idea: str
