"""
Combine prompt schema for request validation.
"""

from pydantic import BaseModel


class CombinePromptRequest(BaseModel):
    """Request model for prompt combination."""
    scene_description: str
