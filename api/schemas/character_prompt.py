"""
Character prompt schema for request validation.
"""

from pydantic import BaseModel


class CharacterPromptRequest(BaseModel):
    """Request model for character prompt creation."""
    description: str
    name: str
