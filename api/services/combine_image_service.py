"""
Combine image service for handling image combination logic.

This service combines character and setting images using detailed prompts
to create cohesive scenes with proper positioning and integration.
"""

import replicate
import os
from typing import Dict
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class CombineImageService:
    """Service for image combination operations using AI-generated content."""

    @staticmethod
    def combine_image(
        prompt: str, character_image: str, setting_image: str
    ) -> Dict[str, str]:
        """
        Combine character and setting images using Minimax image-01 model.

        This method generates a combined image from character and setting images
        using the Minimax image-01 model via Replicate API.

        Args:
            prompt: Detailed combination prompt (from combine prompt service)
            character_image: URL of the character image
            setting_image: URL of the setting image

        Returns:
            Dict containing:
                - status: "success" or "error"
                - message: Description of the result
                - image_url: URL of the generated combined image (if successful)
                - raw_output: Raw API response (if error)
        """
        try:  # Start try block to catch any exceptions during image combination
            # Initialize Replicate client with API token from environment variables
            # This sets up the connection to Replicate's API using the token from .env file
            replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

            # Call the Flux Kontext model through Replicate API
            # This sends our prompt and image URLs to the multi-image combination model
            output = replicate.run(
                "flux-kontext-apps/multi-image-kontext-pro",  # Specify the exact Flux Kontext model to use
                input={  # Pass parameters to control the image combination
                    "prompt": prompt,  # The detailed combination prompt
                    "aspect_ratio": "16:9",  # Widescreen aspect ratio for combined scenes
                    "input_image_1": character_image,  # URL of the character image
                    "input_image_2": setting_image,  # URL of the setting image
                    "output_format": "png",  # PNG format for high quality
                    "safety_tolerance": 2,  # Safety tolerance level
                },
            )

            # Extract the generated image URL from the response
            # Flux Kontext model returns a single FileOutput object with url() method
            if hasattr(output, "url") and callable(getattr(output, "url")):
                # Direct FileOutput object with url() method
                image_url = output.url()
            else:
                # Fallback if output is not a FileOutput object
                image_url = str(output)

            # Validate that we received a valid image URL
            if not image_url or not isinstance(image_url, str):  # Check if URL is valid
                return {
                    "status": "error",
                    "message": "Failed to generate combined image. Invalid response from model.",
                    "raw_output": str(output),
                }

            # Return successful response with the generated image URL
            return {
                "status": "success",  # Indicate successful generation
                "message": "Images combined successfully",  # Success message
                "image_url": image_url,  # The URL of the generated combined image
            }

        except (
            Exception
        ) as e:  # Catch any unexpected errors (API failures, network issues)
            # Return generic error response for any other exceptions
            return {
                "status": "error",
                "message": f"Failed to combine images: {str(e)}",  # Include error details
            }
