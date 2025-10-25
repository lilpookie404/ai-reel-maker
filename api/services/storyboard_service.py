"""
Storyboard service for handling storyboard creation logic.

This service uses Replicate's Gemini 2.5 Flash model to generate 60-second video scripts
with 12 scenes, each featuring one character. The service handles JSON parsing, validation,
and error recovery for truncated responses.
"""

import os
import json
import replicate  # pyright: ignore[reportMissingImports]
import contextlib
from typing import Dict, Any
from dotenv import load_dotenv  # pyright: ignore[reportMissingImports]

# Load environment variables from .env file
load_dotenv()


class StoryboardService:
    """Service for storyboard operations using AI-generated content."""

    @staticmethod
    def create_storyboard(idea: str) -> Dict[str, Any]:
        """
        Create a storyboard using Gemini 2.5 Flash via Replicate.

        This method generates a complete 60-second video script with:
        - 1 character with detailed descriptions
        - 12 scenes (5 seconds each) with independent settings
        - Each scene features exactly one character
        - Complete JSON structure validation

        Args:
            idea: Story idea for storyboard creation (e.g., "A young woman discovers time travel")

        Returns:
            Dict containing:
                - status: "success" or "error"
                - message: Description of the result
                - data: Generated storyboard JSON (if successful)
                - raw_output: Raw AI response (if error)
        """
        try:  # Start try block to catch any exceptions during storyboard generation
            # Initialize Replicate client with API token from environment variables
            # This sets up the connection to Replicate's API using the token from .env file
            replicate.Client(api_token=os.getenv("REPLICATE_API_TOKEN"))

            # Create a detailed prompt string for the AI model using f-string formatting
            # The prompt includes the user's idea and specific instructions for JSON structure
            prompt = f"""
            Create a 60-second video script based on this idea: "{idea}"
            
            Generate a JSON response with exactly this structure:
            {{
                "characters": [
                    {{
                        "name": "Character's real name (e.g., Sarah, Emma, Michael)",
                        "description": "Detailed description including age, basic appearance, relation to other characters, etc."
                    }}
                ],
                "sound_effect": "One word describing the ambient sound for the entire video (e.g., rain, traffic, wind, ocean, birds, silence, footsteps, typing, cooking, etc.)",
                "scenes": [
                    {{
                        "scene_number": "Sequential scene number",
                        "setting": "Detailed description of location, time, atmosphere, lighting, and visual elements (ONLY for scene 1, leave empty for scenes 2-12)",
                        "description": "2-3 sentences about key events and character interactions, with explicit mention of the person's position and action using generic references like 'the person' or 'the character'"
                    }}
                ]
            }}
            
            Requirements:
            - Create exactly 12 scenes, no more, no less
            - Use exactly one single character for the entire storyboard (the same character appears in all scenes)
            - Each scene should be approximately 5 seconds long (60 seconds total)
            - Use realistic character names
            - Choose ONE appropriate sound effect word that matches the story's setting and mood (e.g., "rain" for storm scenes, "traffic" for city scenes, "wind" for outdoor scenes, "silence" for quiet indoor scenes)
            - Scene 1: Provide detailed setting description (location, time, atmosphere, lighting, visual elements)
            - Scenes 2-12: Leave setting field empty or use "Continuing from previous scene" - these will use video frame extraction for continuity
            - Scene descriptions must follow Seedance-1-pro video generation guidelines for optimal results
            - Use verb-centric declarative sentences with generic character references (e.g., "The person wakes up. The person stretches arms. The person sits upright.")
            - NO compound sentences (no 'and', 'but', 'while' connecting actions)
            - NO subordinate or dependent clauses
            - Focus on physical transformations and movements that are visually clear
            - Limit actions to 2-3 per scene maximum - no more than 2-3 actions should be in a scene
            - Each action should be a simple, declarative sentence
            - Actions should be essential movements that can be completed in 5 seconds
            - End each scene with a clear, stable pose for better frame extraction
            - Avoid complex emotional descriptions - focus on physical actions only
            - Ensure each scene ends with a pose that can be easily extracted as a frame
            - Ensure strict continuity: each scene must be a direct continuation and extended version of the previous scene's moment (no jumps, no resets, no new subjects)
            - Ensure the story progresses smoothly and logically across all 12 scenes
            - Return ONLY the JSON, no additional text
            """

            output = replicate.run(
                "google/gemini-2.5-flash",  # Specify the exact model to use
                input={  # Pass parameters to control the AI's behavior
                    "top_p": 0.95,  # Nucleus sampling parameter (0.95 = high diversity)
                    "prompt": prompt,  # The detailed prompt we created above
                    "temperature": 0.7,  # Controls randomness (0.7 = balanced creativity)
                    "dynamic_thinking": False,  # Disable for faster response
                    "max_output_tokens": 8000,  # Maximum tokens to generate (prevents truncation)
                },
            )

            # Initialize empty string to collect the AI's response
            # Replicate returns an iterator that streams the response in chunks
            generated_content = ""
            # Loop through each chunk of the streaming response
            for item in output:
                # Convert each chunk to string and append to our content string
                generated_content += str(item)

            # Check if the response starts with markdown code block markers
            # AI models often wrap JSON in markdown formatting which breaks parsing
            if generated_content.startswith(
                "```json"
            ):  # Check for JSON-specific markdown
                # Remove the ```json marker from start and ``` from end, then strip whitespace
                generated_content = (
                    generated_content.replace("```json", "").replace("```", "").strip()
                )
            elif generated_content.startswith("```"):  # Check for generic markdown
                # Remove generic ``` markers and strip whitespace
                generated_content = generated_content.replace("```", "").strip()

            # Start a try block to handle JSON parsing and validation
            try:
                # Check if the response appears to be truncated by counting quotes
                # Valid JSON should have an even number of quotes (opening and closing)
                if (
                    generated_content.count('"') % 2 != 0
                ):  # If odd number of quotes, likely truncated
                    # Return error response with truncated content for debugging
                    return {
                        "status": "error",
                        "message": "Response appears to be truncated. Please try again.",
                        "raw_output": generated_content,
                    }

                # Parse the cleaned content as JSON
                # This will raise JSONDecodeError if the content is not valid JSON
                storyboard_data = json.loads(generated_content)

                # Validate that the JSON contains required top-level keys
                # Check if "characters", "scenes", and "sound_effect" keys exist in the response
                if (
                    "characters" not in storyboard_data  # Check for characters key
                    or "scenes" not in storyboard_data  # Check for scenes key
                    or "sound_effect" not in storyboard_data  # Check for sound_effect key
                ):
                    # Raise ValueError if required structure is missing
                    raise ValueError("Invalid storyboard structure")

                # Validate that we have exactly 12 scenes as required
                # Count the number of scenes in the scenes array
                if len(storyboard_data["scenes"]) != 12:  # Check scene count
                    # Raise ValueError with specific count information
                    raise ValueError(
                        f"Expected 12 scenes, got {len(storyboard_data['scenes'])}"
                    )

                # Return successful response with the validated storyboard data
                return {
                    "status": "success",  # Indicate successful generation
                    "message": "Storyboard created successfully",  # Success message
                    "data": storyboard_data,  # The actual storyboard JSON data
                }

            except json.JSONDecodeError as e:  # Catch JSON parsing errors
                # Attempt to recover from truncated JSON by cleaning incomplete content
                # Use contextlib.suppress to ignore any exceptions during recovery
                with contextlib.suppress(
                    Exception
                ):  # Suppress any exceptions in recovery block
                    # Check if response ends with incomplete string (not properly closed)
                    if generated_content.endswith(  # Check if ends with quote
                        '"'
                    ) and not generated_content.endswith(
                        '"}'
                    ):  # But not with proper JSON closing
                        # Find the last complete JSON object by finding the last closing brace
                        last_complete_brace = generated_content.rfind(
                            "}"
                        )  # Find last }
                        if last_complete_brace > 0:  # If we found a closing brace
                            # Truncate content to the last complete object
                            generated_content = generated_content[
                                : last_complete_brace
                                + 1  # Include the closing brace
                            ]
                            
                            storyboard_data = json.loads(generated_content)

                            
                            return {
                                "status": "success",
                                "message": "Storyboard created successfully (truncated content cleaned)",
                                "data": storyboard_data,
                            }

                
                return {
                    "status": "error",
                    "message": f"Failed to parse JSON response: {str(e)}",  
                    "raw_output": generated_content,  
                }
            except (
                ValueError
            ) as e: 
                
                return {
                    "status": "error",
                    "message": f"Validation error: {str(e)}",  
                    "raw_output": generated_content,  
                }

        except (
            Exception
        ) as e: 
            
            return {
                "status": "error",
                "message": f"Failed to generate storyboard: {str(e)}", 
            }
