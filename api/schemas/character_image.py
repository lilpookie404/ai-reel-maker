"""
Character image schema for request validation.
"""

from pydantic import BaseModel


class CharacterImageRequest(BaseModel):
    """Request model for character image creation."""
    prompt: str
