"""
Generate video service for handling video generation logic.

This service uses the ByteDance Seedance-1-pro model via Replicate to generate
high-quality videos from prompts and initial images.
"""

import replicate
import os
from typing import Dict
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class GenerateVideoService:
    """Service for video generation operations using AI-generated content."""

    @staticmethod
    def generate_video(prompt: str, initial_image: str) -> Dict[str, str]:
        """
        Generate a video using ByteDance Seedance-1-pro model.

        This method generates a high-quality video from a prompt and initial image
        using the ByteDance Seedance-1-pro model via Replicate API.

        Args:
            prompt: Detailed video generation prompt (from video prompt service)
            initial_image: URL of the initial image for video generation

        Returns:
            Dict containing:
                - status: "success" or "error"
                - message: Description of the result
                - video_url: URL of the generated video (if successful)
                - raw_output: Raw API response (if error)
        """
        try:  # Start try block to catch any exceptions during video generation
            # Initialize Replicate client with API token from environment variables
            # This sets up the connection to Replicate's API using the token from .env file
            replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

            # Call the ByteDance Seedance-1-pro model through Replicate API
            # This sends our prompt and initial image to the video generation model
            output = replicate.run(
                "bytedance/seedance-1-pro",  # Specify the exact ByteDance model to use
                input={  # Pass parameters to control the video generation
                    "fps": 24,  # Frames per second for smooth video playback
                    "prompt": prompt,  # The detailed video generation prompt
                    "image": initial_image,  # URL of the initial image for video generation
                    "duration": 5,  # Video duration in seconds
                    "resolution": "480p",  # High definition resolution
                    "aspect_ratio": "16:9",  # Widescreen aspect ratio
                    "camera_fixed": False,  # Allow camera movement for dynamic shots
                },
            )

            # Extract the generated video URL from the response
            # ByteDance Seedance-1-pro model returns a single FileOutput object with url() method
            if hasattr(output, "url") and callable(getattr(output, "url")):
                # Direct FileOutput object with url() method
                video_url = output.url()
            else:
                # Fallback if output is not a FileOutput object
                video_url = str(output)

            # Validate that we received a valid video URL
            if not video_url or not isinstance(video_url, str):  # Check if URL is valid
                return {
                    "status": "error",
                    "message": "Failed to generate video. Invalid response from model.",
                    "raw_output": str(output),
                }

            # Return successful response with the generated video URL
            return {
                "status": "success",  # Indicate successful generation
                "message": "Video generated successfully",  # Success message
                "video_url": video_url,  # The URL of the generated video
            }

        except (
            Exception
        ) as e:  # Catch any unexpected errors (API failures, network issues)
            # Return generic error response for any other exceptions
            return {
                "status": "error",
                "message": f"Failed to generate video: {str(e)}",  # Include error details
            }
