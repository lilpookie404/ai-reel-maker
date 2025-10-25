"""
Combine prompt service for handling prompt combination logic.

This service uses Gemini 2.5 Flash to create detailed prompts that combine
character and setting images into cohesive scenes with specific positioning,
posture, and camera angles.
"""

import replicate
import os
from typing import Dict
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class CombinePromptService:
    """Service for prompt combination operations using AI-generated content."""

    @staticmethod
    def combine_prompt(scene_description: str) -> Dict[str, str]:
        """
        Create a detailed combination prompt using Gemini 2.5 Flash.

        This method analyzes the scene description to determine character positioning,
        posture, orientation, and camera angle for combining character and setting images.

        Args:
            scene_description: Scene description for prompt combination

        Returns:
            Dict containing:
                - status: "success" or "error"
                - message: Description of the result
                - prompt: Generated combination prompt (if successful)
                - raw_output: Raw AI response (if error)
        """
        try:  # Start try block to catch any exceptions during prompt generation
            # Initialize Replicate client with API token from environment variables
            # This sets up the connection to Replicate's API using the token from .env file
            replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

            # Create a detailed prompt for Gemini to analyze the scene and create combination instructions
            # This prompt focuses on character positioning, posture, and camera angles
            prompt = f"""
            Analyze this scene description and create a detailed prompt for combining a character image with a setting image.
            
            Scene Description: {scene_description}
            
            Create a comprehensive combination prompt that includes:
            - Character's specific body position and posture
            - Where the character is positioned in the setting
            - Character's orientation (facing direction, body angle)
            - Camera angle that best captures the scene's mood and action
            - Lighting and atmosphere integration
            - Natural interaction between character and environment
            - Specific details about what the character is doing
            - Spatial relationships between character and setting elements
            
            Requirements for the combination:
            - Natural, descriptive language that flows well
            - Focus on the character's specific actions and positioning
            - Clear camera angle and perspective
            - Integration of character with the setting environment
            - Maintain the mood and atmosphere of the scene
            - Be specific about character placement and orientation
            - Use cinematic language for professional results
            
            IMPORTANT: Keep the final prompt under 200 words. Be concise but descriptive.
            
            Return ONLY the detailed combination prompt, no additional text or formatting.
            """

            # Call the Gemini 2.5 Flash model through Replicate API
            # This sends our prompt to the AI model and gets back a streaming response
            output = replicate.run(
                "google/gemini-2.5-flash",  # Specify the exact model to use
                input={  # Pass parameters to control the AI's behavior
                    "top_p": 0.95,  # Nucleus sampling parameter (0.95 = high diversity)
                    "prompt": prompt,  # The detailed prompt we created above
                    "temperature": 0.7,  # Balanced creativity for scene analysis
                    "dynamic_thinking": False,  # Disable for faster response
                    "max_output_tokens": 1500,  # Sufficient for detailed combination prompt
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
            if len(generated_content.strip()) < 30:  # Check if response is too short
                return {
                    "status": "error",
                    "message": "Generated prompt is too short. Please try again.",
                    "raw_output": generated_content,
                }

            # Return successful response with the generated prompt
            return {
                "status": "success",  # Indicate successful generation
                "message": "Combine prompt created successfully",  # Success message
                "prompt": generated_content.strip(),  # The actual combination prompt
            }

        except (
            Exception
        ) as e:  # Catch any unexpected errors (API failures, network issues)
            # Return generic error response for any other exceptions
            return {
                "status": "error",
                "message": f"Failed to generate combine prompt: {str(e)}",  # Include error details
            }
