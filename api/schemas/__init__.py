"""
Schemas module for AI Reel Maker API

This module contains Pydantic models for request/response validation.
"""

from .storyboard import StoryboardRequest
from .scene import VideoPromptRequest
from .character_prompt import CharacterPromptRequest
from .setting_prompt import SettingPromptRequest
from .character_image import CharacterImageRequest
from .setting_image import SettingImageRequest
from .combine_prompt import CombinePromptRequest
from .combine_image import CombineImageRequest
from .generate_video import GenerateVideoRequest
from .extract_frame import ExtractFrameRequest
from .merge_videos import MergeVideosRequest
from .add_sound_effect import AddSoundEffectRequest

__all__ = [
    "StoryboardRequest",
    "VideoPromptRequest",
    "CharacterPromptRequest",
    "SettingPromptRequest",
    "CharacterImageRequest",
    "SettingImageRequest",
    "CombinePromptRequest",
    "CombineImageRequest",
    "GenerateVideoRequest",
    "ExtractFrameRequest",
    "MergeVideosRequest",
    "AddSoundEffectRequest",
]
