"""
Service for merging multiple videos using MoviePy.
"""

import os
import tempfile
import requests
from typing import Dict, List
from moviepy import VideoFileClip, concatenate_videoclips


class MergeVideosService:
    """Service for merging multiple videos into a single video."""

    @staticmethod
    def merge_videos(video_urls: List[str]) -> Dict[str, str]:
        """
        Merge multiple videos into a single video using MoviePy.

        This method downloads videos from URLs, concatenates them using MoviePy,
        and uploads the merged video to a temporary location for access.

        Args:
            video_urls: List of video URLs to merge

        Returns:
            Dict containing:
                - status: "success" or "error"
                - message: Description of the result
                - merged_video_url: URL of the merged video (if successful)
        """
        try:
            # Validate input
            if not video_urls or len(video_urls) < 2:
                return {
                    "status": "error",
                    "message": "At least 2 video URLs are required for merging",
                }

            # Create temporary directory for processing
            with tempfile.TemporaryDirectory() as temp_dir:
                video_clips = []

                # Download and process each video
                for i, video_url in enumerate(video_urls):
                    try:
                        # Download video to temporary file
                        response = requests.get(video_url, timeout=30)
                        response.raise_for_status()

                        # Save to temporary file
                        temp_video_path = os.path.join(temp_dir, f"video_{i}.mp4")
                        with open(temp_video_path, "wb") as f:
                            f.write(response.content)

                        # Load video clip with MoviePy
                        video_clip = VideoFileClip(temp_video_path)
                        video_clips.append(video_clip)

                    except Exception as e:
                        # Clean up any loaded clips before returning error
                        for clip in video_clips:
                            clip.close()
                        return {
                            "status": "error",
                            "message": f"Failed to download or process video {i + 1}: {str(e)}",
                        }

                try:
                    # Concatenate all video clips
                    merged_clip = concatenate_videoclips(video_clips)

                    # Save merged video to project directory
                    output_dir = os.path.dirname(
                        os.path.dirname(os.path.dirname(__file__))
                    )
                    merged_video_path = os.path.join(output_dir, "merged_video.mp4")

                    merged_clip.write_videofile(
                        merged_video_path,
                        codec="libx264",
                        audio_codec="aac",
                        temp_audiofile="temp-audio.m4a",
                        remove_temp=True,
                    )

                    # Close all clips to free memory
                    merged_clip.close()
                    for clip in video_clips:
                        clip.close()

                    return {
                        "status": "success",
                        "message": f"Successfully merged {len(video_urls)} videos",
                        "merged_video_path": merged_video_path,
                        "merged_video_url": f"file://{merged_video_path}",
                    }

                except Exception as e:
                    # Clean up clips on error
                    for clip in video_clips:
                        clip.close()
                    return {
                        "status": "error",
                        "message": f"Failed to merge videos: {str(e)}",
                    }

        except Exception as e:
            return {
                "status": "error",
                "message": f"Failed to merge videos: {str(e)}",
            }
