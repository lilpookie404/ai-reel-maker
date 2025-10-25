"""
Character prompt service for handling character prompt creation logic.

This service uses Gemini 2.5 Flash to expand character descriptions into detailed
prompts for the Minimax image-01 model to generate high-quality character images.
"""

import os
import replicate
from typing import Dict
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class CharacterPromptService:
    """Service for character prompt operations using AI-generated content."""

    @staticmethod
    def create_character_prompt(description: str, name: str) -> Dict[str, str]:
        """
        Create a detailed character prompt using Gemini 2.5 Flash.

        This method expands the character description into a comprehensive prompt
        optimized for the Minimax image-01 model to generate high-quality character images.

        Args:
            description: Basic character description from user
            name: Character name for personalization

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

            # Create a detailed prompt for Gemini to expand the character description
            # This prompt ensures specific formatting for image generation
            prompt = f"""
            Expand this character description into a detailed image generation prompt for a high-quality AI image model.
            
            Character Name: {name}
            Basic Description: {description}
            
            Create a comprehensive prompt that includes:
            - Detailed physical appearance (facial features, body type, age, ethnicity)
            - Specific clothing description (colors, materials, style, fit)
            - Accessories and details (jewelry, bags, shoes, etc.)
            - Pose and positioning requirements
            - Background and lighting specifications
            - Technical quality requirements
            
            CRITICAL REQUIREMENTS:
            - FULL BODY: The character must be STANDING, and FRONT-FACING
            - BACKGROUND: "Plain solid black background" only - NO environment, NO props, NO background elements
            - FOCUS: Maximum focus on the character with minimal background distraction
            - STYLE: Use descriptive, specific language similar to professional photography briefs
            - LENGTH: Keep the final prompt under 1200 characters for optimal processing
            
            
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
                "message": "Character prompt created successfully",  # Success message
                "prompt": generated_content.strip(),  # The actual image generation prompt
            }

        except (
            Exception
        ) as e:  # Catch any unexpected errors (API failures, network issues)
            # Return generic error response for any other exceptions
            return {
                "status": "error",
                "message": f"Failed to generate character prompt: {str(e)}",  # Include error details
            }
