"""
Simple AI Reel Maker Workflow
Run this script to generate a complete video from an idea.
"""

import os

import requests

DEFAULT_API_URL = "http://localhost:8000"


def get_api_url():
    """Return the configured API base URL for the local workflow."""
    return os.getenv("AI_REEL_API_URL", DEFAULT_API_URL).rstrip("/")


def make_request(endpoint, data=None, max_retries=3):
    """Make a simple HTTP request to the API with retry logic."""
    url = f"{get_api_url()}{endpoint}"

    for attempt in range(max_retries):
        try:
            if data:
                response = requests.post(url, json=data)
            else:
                response = requests.get(url)

            result = response.json()

            # Check if result is valid and not None
            if result and result.get("status") == "success":
                return result
            elif result and result.get("status") == "error":
                print(
                    f"   ⚠️  API error (attempt {attempt + 1}/{max_retries}): {result.get('message', 'Unknown error')}"
                )
            else:
                print(f"   ⚠️  Invalid response (attempt {attempt + 1}/{max_retries})")

            # If not the last attempt, wait before retrying
            if attempt < max_retries - 1:
                print("   🔄 Retrying in 2 seconds...")
                import time

                time.sleep(2)

        except Exception as e:
            print(f"   ⚠️  Request error (attempt {attempt + 1}/{max_retries}): {e}")
            if attempt < max_retries - 1:
                print("   🔄 Retrying in 2 seconds...")
                import time

                time.sleep(2)

    print(f"   ❌ Failed after {max_retries} attempts")
    return None


def main():
    print("🎬 AI Reel Maker - Simple Workflow")
    print("=" * 40)

    # Get idea from user
    idea = input("Enter your story idea: ")
    if not idea:
        idea = "A woman sits at her window watching a heavy rainstorm, finding peaceful joy in the cozy warmth of her dry indoor space."
        print(f"Using default idea: {idea}")

    print(f"\n🚀 Starting workflow with idea: {idea}")
    print("=" * 40)

    try:
        # Step 1: Generate storyboard
        print("\n1️⃣ Generating storyboard...")
        storyboard = make_request("/storyboard", {"idea": idea})
        if not storyboard:
            print("❌ Failed to generate storyboard")
            return

        scenes = storyboard["data"]["scenes"]
        character = storyboard["data"]["characters"][0]
        sound_effect = storyboard["data"]["sound_effect"]
        print(f"✅ Generated {len(scenes)} scenes with sound effect: {sound_effect}")

        # Step 2: Create character
        print("\n2️⃣ Creating character...")
        char_prompt = make_request(
            "/character-prompt",
            {"description": character["description"], "name": character["name"]},
        )
        if not char_prompt:
            print("❌ Failed to create character prompt")
            return

        char_image = make_request("/character-image", {"prompt": char_prompt["prompt"]})
        if not char_image:
            print("❌ Failed to create character image")
            return

        print("✅ Character created")

        # Step 3: Process scenes
        video_urls = []
        setting_image = None

        for i, scene in enumerate(scenes, 1):
            print(f"\n3️⃣ Processing Scene {i}/{len(scenes)}")

            # Create setting (only for first scene)
            if i == 1:
                print("   Creating setting...")
                setting_prompt = make_request(
                    "/setting-prompt", {"description": scene["setting"]}
                )
                if setting_prompt:
                    setting_img = make_request(
                        "/setting-image", {"prompt": setting_prompt["prompt"]}
                    )
                    if setting_img:
                        setting_image = setting_img["image_url"]
                        print("   ✅ Setting created")
                    else:
                        print("   ❌ Failed to create setting image")
                        continue
                else:
                    print("   ❌ Failed to create setting prompt")
                    continue

                # Combine character and setting (only for first scene)

                print("   Combining scene...")
                combine_prompt = make_request(
                    "/combine-prompt", {"scene_description": scene["description"]}
                )
                if combine_prompt:
                    combined = make_request(
                        "/combine-image",
                        {
                            "prompt": combine_prompt["prompt"],
                            "character_image": char_image["image_url"],
                            "setting_image": setting_image,
                        },
                    )
                    if not combined:
                        print("   ❌ Failed to combine scene")
                        continue
                    initial_image = combined["image_url"]
                    print("   ✅ Scene combined")
                else:
                    print("   ❌ Failed to create combination prompt")
                    continue
            else:
                # For scenes 2+, extract frame from previous video
                print("   Extracting frame from previous video...")
                frame = make_request("/extract-frame", {"video_url": video_urls[-1]})
                if frame:
                    initial_image = frame["frame_url"]
                    print("   ✅ Frame extracted")
                else:
                    print("   ❌ Failed to extract frame, skipping scene")
                    continue

            # Generate video
            print("   Generating video...")
            # video_prompt = make_request(
            #     "/video-prompt", {"scene_description": scene["description"]}
            # )
            video = make_request(
                "/generate-video",
                {
                    "prompt": scene["description"],
                    "initial_image": initial_image,
                },
            )
            if video:
                # Add sound effects to the video
                print(f"   Adding sound effects ({sound_effect})...")
                video_with_sound = make_request(
                    "/add-sound-effect",
                    {"video_url": video["video_url"], "sound_effect": sound_effect},
                )
                if video_with_sound:
                    video_urls.append(video_with_sound["video_url"])
                    print(f"   ✅ Scene {i} video generated with sound effects")
                else:
                    # Fallback to original video if sound effects fail
                    video_urls.append(video["video_url"])
                    print(f"   ✅ Scene {i} video generated (sound effects failed)")
            else:
                print(f"   ❌ Failed to generate video for scene {i}")

        # Step 4: Merge all videos
        if video_urls:
            print(f"\n4️⃣ Merging {len(video_urls)} videos...")
            merged = make_request("/merge-videos", {"video_urls": video_urls})
            if merged:
                print("✅ All videos merged successfully!")
                print(
                    f"🎬 Final video: {merged.get('merged_video_path', 'Check response for details')}"
                )
            else:
                print("❌ Failed to merge videos")
        else:
            print("❌ No videos to merge")

    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main()
