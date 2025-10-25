"""
Extract frame service for handling video frame extraction logic.

This service uses Replicate's lucataco/frame-extractor model to extract frames
from video URLs. The service handles frame extraction and returns the extracted
frame image URL. When return_first_frame is False, the model extracts a representative
frame from the video (not necessarily the first frame).
"""

import replicate
import os
from typing import Dict
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class ExtractFrameService:
    """Service for extracting frames from videos using AI models."""

    @staticmethod
    def extract_frame(video_url: str) -> Dict[str, str]:
        """
        Extract a frame from a video using Replicate's lucataco/frame-extractor model.

        This method takes a video URL and extracts a representative frame from the video.
        With return_first_frame=False, the model intelligently selects a representative
        frame rather than just the first frame, which often provides better results.

        Args:
            video_url: URL of the video to extract frame from

        Returns:
            Dict containing:
                - status: "success" or "error"
                - message: Description of the result
                - frame_url: URL of the extracted frame (if successful)
        """
        try:
            # Initialize Replicate client with API token from environment variables
            # This sets up the connection to Replicate's API using the token from .env file
            replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

            # Use Replicate's lucataco/frame-extractor model for intelligent frame extraction
            # With return_first_frame=False, the model selects a representative frame
            # rather than just the first frame, often providing better visual results
            output = replicate.run(
                "lucataco/frame-extractor:c02b3c1df64728476b1c21b0876235119e6ac08b0c9b8a99b82c5f0e0d42442d",
                input={
                    "video": video_url,
                    "return_first_frame": False,  # Let the model choose the best representative frame
                },
            )

            # Handle the output - extract the frame URL from the model response
            # The lucataco/frame-extractor returns a FileOutput object with a URL method
            if hasattr(output, "url") and callable(getattr(output, "url")):
                frame_url = output.url()  # Get the URL of the extracted frame image
            else:
                frame_url = str(output)  # Fallback to string conversion if needed

            # Validate that we got a valid URL from the frame extraction
            if not frame_url or not isinstance(frame_url, str):
                return {
                    "status": "error",
                    "message": "Failed to extract frame. Invalid response from model.",
                    "raw_output": str(output),
                }

            return {
                "status": "success",
                "message": "Frame extracted successfully",
                "frame_url": frame_url,
            }

        except Exception as e:
            return {
                "status": "error",
                "message": f"Failed to extract frame: {str(e)}",
            }
