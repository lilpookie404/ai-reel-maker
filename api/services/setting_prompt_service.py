"""
Setting prompt service for handling setting prompt creation logic.

This service uses Gemini 2.5 Flash to expand setting descriptions into detailed
prompts for the Minimax image-01 model to generate high-quality setting images.
"""

import replicate
import os
from typing import Dict
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class SettingPromptService:
    """Service for setting prompt operations using AI-generated content."""

    @staticmethod
    def create_setting_prompt(description: str) -> Dict[str, str]:
        """
        Create a detailed setting prompt using Gemini 2.5 Flash.

        This method expands the setting description into a comprehensive prompt
        optimized for the Minimax image-01 model to generate high-quality setting images.

        Args:
            description: Basic setting description from user

        Returns:
            Dict containing:
                - status: "success" or "error"
                - message: Description of the result
                - prompt: Generated image generation prompt (if successful)
                - raw_output: Raw AI response (if error)
        """
        try:  # Start try block to catch any exceptions during prompt generation
            # Initialize Replicate client with API token from environment variables
            # This sets up the connection to Replicate's API using the token from .env file
            replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

            # Create a detailed prompt for Gemini to expand the setting description
            # This prompt ensures specific formatting for cinematic setting image generation
            prompt = f"""
            Expand this setting description into a detailed image generation prompt for a high-quality AI image model.
            
            Setting Description: {description}
            
            Create a comprehensive prompt that includes:
            - Detailed scene description (location, environment, architecture)
            - Lighting conditions (natural, artificial, time of day, mood)
            - Atmospheric elements (weather, fog, dust, particles)
            - Objects and their specific placements in the scene
            - Cinematic composition and framing
            - Color palette and visual style
            - Depth and perspective details
            - Environmental textures and materials
            
            Requirements for the image:
            - Cinematic style with professional photography quality
            - High resolution and detailed rendering
            - Proper lighting and atmospheric effects
            - Clear object placement and spatial relationships
            - Dramatic or moody atmosphere appropriate to the setting
            - Use specific, descriptive language for AI image generation
            - Focus on visual storytelling and scene composition
            
            IMPORTANT: Keep the final prompt under 250 words. Be concise but descriptive.
            
            Return ONLY the detailed image generation prompt, no additional text or formatting.
            """

            # Call the Gemini 2.5 Flash model through Replicate API
            # This sends our prompt to the AI model and gets back a streaming response
            output = replicate.run(
                "google/gemini-2.5-flash",  # Specify the exact model to use
                input={  # Pass parameters to control the AI's behavior
                    "top_p": 0.95,  # Nucleus sampling parameter (0.95 = high diversity)
                    "prompt": prompt,  # The detailed prompt we created above
                    "temperature": 0.8,  # Higher creativity for detailed descriptions
                    "dynamic_thinking": False,  # Disable for faster response
                    "max_output_tokens": 2000,  # Sufficient for detailed prompt generation
                },
            )

            # Initialize empty string to collect the AI's response
            # Replicate returns an iterator that streams the response in chunks
            generated_content = ""
            # Loop through each chunk of the streaming response
            for item in output:
                # Convert each chunk to string and append to our content string
                generated_content += str(item)

            # Clean any markdown formatting that AI models might add
            # Remove code block markers that could interfere with the prompt
            if generated_content.startswith("```"):  # Check for markdown code blocks
                # Remove ``` markers and strip whitespace
                generated_content = generated_content.replace("```", "").strip()

            # Validate that we have meaningful content
            if len(generated_content.strip()) < 50:  # Check if response is too short
                return {
                    "status": "error",
                    "message": "Generated prompt is too short. Please try again.",
                    "raw_output": generated_content,
                }

            # Return successful response with the generated prompt
            return {
                "status": "success",  # Indicate successful generation
                "message": "Setting prompt created successfully",  # Success message
                "prompt": generated_content.strip(),  # The actual image generation prompt
            }

        except (
            Exception
        ) as e:  # Catch any unexpected errors (API failures, network issues)
            # Return generic error response for any other exceptions
            return {
                "status": "error",
                "message": f"Failed to generate setting prompt: {str(e)}",  # Include error details
            }
