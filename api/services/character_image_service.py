"""
Character image service for handling character image creation logic.

This service uses the Minimax image-01 model via Replicate to generate
high-quality character images from detailed prompts.
"""

import replicate
import os
from typing import Dict
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class CharacterImageService:
    """Service for character image operations using AI-generated content."""

    @staticmethod
    def create_character_image(prompt: str) -> Dict[str, str]:
        """
        Create a character image using Minimax image-01 model.

        This method generates a high-quality character image from a detailed prompt
        using the Minimax image-01 model via Replicate API.

        Args:
            prompt: Detailed image generation prompt (from character prompt service)

        Returns:
            Dict containing:
                - status: "success" or "error"
                - message: Description of the result
                - image_url: URL of the generated image (if successful)
                - raw_output: Raw API response (if error)
        """
        try:  # Start try block to catch any exceptions during image generation
            # Initialize Replicate client with API token from environment variables
            # This sets up the connection to Replicate's API using the token from .env file
            replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

            # Call the Minimax image-01 model through Replicate API
            # This sends our prompt to the image generation model and gets back an image URL
            output = replicate.run(
                "minimax/image-01",  # Specify the exact Minimax model to use
                input={  # Pass parameters to control the image generation
                    "prompt": prompt,  # The detailed image generation prompt
                    "aspect_ratio": "1:1",  # Square aspect ratio for character images
                    "number_of_images": 1,  # Generate single image
                    "prompt_optimizer": True,  # Enable prompt optimization for better results
                },
            )

            # Extract the generated image URL from the response
            # Replicate returns a list with FileOutput objects that have url() method
            if isinstance(output, list) and len(output) > 0:
                # Get the first FileOutput object and extract its URL
                file_output = output[0]
                # Check if it's a FileOutput object with url() method
                if hasattr(file_output, "url") and callable(
                    getattr(file_output, "url")
                ):
                    image_url = file_output.url()
                else:
                    # If it's already a string or doesn't have url() method
                    image_url = str(file_output)
            else:
                # Fallback if output is not a list
                image_url = str(output)

            # Validate that we received a valid image URL
            if not image_url or not isinstance(image_url, str):  # Check if URL is valid
                return {
                    "status": "error",
                    "message": "Failed to generate image. Invalid response from model.",
                    "raw_output": str(output),
                }

            # Return successful response with the generated image URL
            return {
                "status": "success",  # Indicate successful generation
                "message": "Character image created successfully",  # Success message
                "image_url": image_url,  # The URL of the generated character image
            }

        except (
            Exception
        ) as e:  # Catch any unexpected errors (API failures, network issues)
            # Return generic error response for any other exceptions
            return {
                "status": "error",
                "message": f"Failed to generate character image: {str(e)}",  # Include error details
            }
