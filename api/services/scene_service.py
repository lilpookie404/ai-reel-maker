"""
Video prompt service for handling video prompt creation logic.

This service uses Gemini 2.5 Flash to create detailed prompts for the
ByteDance Seedance-1-pro model to generate stable, high-quality videos.
"""

import replicate  # pyright: ignore[reportMissingImports]
import os
from typing import Dict
from dotenv import load_dotenv  # pyright: ignore[reportMissingImports]

# Load environment variables from .env file
load_dotenv()


class VideoPromptService:
    """Service for video prompt operations using AI-generated content."""

    @staticmethod
    def create_video_prompt(scene_description: str) -> Dict[str, str]:
        """
        Create a detailed video prompt using Gemini 2.5 Flash.

        This method analyzes the scene description to create a prompt optimized
        for the ByteDance Seedance-1-pro model following specific video generation rules.

        Args:
            scene_description: Scene description for video prompt creation

        Returns:
            Dict containing:
                - status: "success" or "error"
                - message: Description of the result
                - prompt: Generated video generation prompt (if successful)
                - raw_output: Raw AI response (if error)
        """
        try:  # Start try block to catch any exceptions during prompt generation
            # Initialize Replicate client with API token from environment variables
            # This sets up the connection to Replicate's API using the token from .env file
            replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

            # Create a detailed prompt for Gemini to analyze the scene and create video generation instructions
            # This prompt follows specific rules for stable video generation with character positioning analysis
            prompt = f"""
            Analyze this scene description and create a video generation prompt for a high-quality AI video model.
            
            Scene Description: {scene_description}
            
            First, analyze where the character is positioned and what they are doing initially in the scene. Then create a video generation prompt that starts from that position and describes the sequence of actions that follow, following these essential guidelines:
            
            CRITICAL REQUIREMENTS FOR STABLE VIDEO GENERATION:
            
            1. FOCUS ON TRANSFORMATION: Describe only the sequence of events that logically connects the start to the end. Answer: "What physically happens to get from the first frame to the final frame?"
            
            2. USE VERB-CENTRIC DECLARATIVE SENTENCES: Structure your entire prompt as a sequence of short, simple, declarative sentences. Each sentence should be a clear Subject-Verb-Object instruction.
            - CORRECT STYLE: "The woman raises her arm. A ball of light appears. The light grows brighter."
            - INCORRECT STYLE: "As the woman raises her arm, a ball of light appears and grows brighter."
            
            3. AVOID COMPLEXITY:
            - NO compound sentences (no 'and', 'but', 'while' connecting actions)
            - NO subordinate or dependent clauses
            - NO metaphors, poetry, or abstract concepts
            
            4. ONE SINGLE, COHERENT EVENT: Describe one continuous action from start to finish. Do not introduce new subjects, conflicting actions, or scene cuts.
            
            5. MANAGE LENGTH: Keep the final prompt between 60 and 120 words. Provide enough detail without overwhelming the model.
            
            Requirements for the video prompt:
            - Start from the character's current position (don't mention the initial position)
            - Focus on physical transformations and movements that follow
            - Use simple, declarative sentence structure
            - Describe one continuous, logical sequence
            - Avoid complex grammar or abstract concepts
            - Keep it concise but descriptive
            - Ensure smooth, stable video generation
            
            Return ONLY the detailed video generation prompt, no additional text or formatting.
            """

            # Call the Gemini 2.5 Flash model through Replicate API
            # This sends our prompt to the AI model and gets back a streaming response
            output = replicate.run(
                "google/gemini-2.5-flash",  # Specify the exact model to use
                input={  # Pass parameters to control the AI's behavior
                    "top_p": 0.95,  # Nucleus sampling parameter (0.95 = high diversity)
                    "prompt": prompt,  # The detailed prompt we created above
                    "temperature": 0.6,  # Lower temperature for more focused, rule-following output
                    "dynamic_thinking": False,  # Disable for faster response
                    "max_output_tokens": 1000,  # Sufficient for concise video prompts
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
            if len(generated_content.strip()) < 10:  # Check if response is too short
                return {
                    "status": "error",
                    "message": "Generated prompt is too short. Please try again.",
                    "raw_output": generated_content,
                }

            # Return successful response with the generated prompt
            return {
                "status": "success",  # Indicate successful generation
                "message": "Video prompt created successfully",  # Success message
                "prompt": generated_content.strip(),  # The actual video generation prompt
            }

        except (
            Exception
        ) as e:  # Catch any unexpected errors (API failures, network issues)
            # Return generic error response for any other exceptions
            return {
                "status": "error",
                "message": f"Failed to generate video prompt: {str(e)}",  # Include error details
            }
