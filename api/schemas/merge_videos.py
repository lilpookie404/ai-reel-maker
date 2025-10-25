"""
Merge videos schema for request validation.
"""

from typing import List
from pydantic import BaseModel


class MergeVideosRequest(BaseModel):
    """Request model for merging multiple videos."""
    video_urls: List[str]
