"""
Generate video schema for request validation.
"""

from pydantic import BaseModel


class GenerateVideoRequest(BaseModel):
    """Request model for video generation."""
    prompt: str
    initial_image: str
