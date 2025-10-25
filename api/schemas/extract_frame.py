from pydantic import BaseModel


class ExtractFrameRequest(BaseModel):
    video_url: str
