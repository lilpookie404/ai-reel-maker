from pydantic import BaseModel


class AddSoundEffectRequest(BaseModel):
    """Request model for adding sound effects to video."""

    video_url: str
    sound_effect: str = "ambient"  # Default to "ambient" if not provided
