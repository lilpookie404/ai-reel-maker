import replicate
import os
from typing import Dict
from dotenv import load_dotenv

load_dotenv()


class AddSoundEffectService:
    @staticmethod
    def add_sound_effect(video_url: str, sound_effect: str = "ambient") -> Dict[str, str]:
        """
        Add sound effects to a video using MMAudio model.

        Args:
            video_url: URL of the video to add sound effects to
            sound_effect: One word describing the sound effect (e.g., "rain", "traffic", "wind")

        Returns:
            Dict containing status, message, and processed video URL
        """
        try:
            # Initialize Replicate client
            replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

            # Use MMAudio model to add sound effects
            output = replicate.run(
                "zsxkib/mmaudio:62871fb59889b2d7c13777f08deb3b36bdff88f7e1d53a50ad7694548a41b484",
                input={
                    "seed": -1,
                    "video": video_url,
                    "prompt": sound_effect,  # Use the specific sound effect from storyboard
                    "duration": 5,  # Match the 5-second video duration
                    "num_steps": 25,
                    "cfg_strength": 4.5,
                    "negative_prompt": "music",
                },
            )

            # Extract the video URL from the output
            if hasattr(output, "url") and callable(getattr(output, "url")):
                processed_video_url = output.url()
            else:
                processed_video_url = str(output)

            # Validate the URL
            if not processed_video_url or not processed_video_url.startswith(
                ("http://", "https://")
            ):
                return {
                    "status": "error",
                    "message": "Invalid video URL returned from sound effect service",
                }

            return {
                "status": "success",
                "message": "Sound effects added successfully",
                "video_url": processed_video_url,
            }

        except Exception as e:
            return {
                "status": "error",
                "message": f"Failed to add sound effects: {str(e)}",
            }
