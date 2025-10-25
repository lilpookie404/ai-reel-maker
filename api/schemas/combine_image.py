"""
Combine image schema for request validation.
"""

from pydantic import BaseModel


class CombineImageRequest(BaseModel):
    """Request model for image combination."""
    prompt: str
    character_image: str
    setting_image: str
