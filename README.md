# AI Reel Maker API

A comprehensive FastAPI application for generating AI-powered video content using advanced AI models including Gemini 2.5 Flash, Minimax image-01, Flux Kontext, and ByteDance Seedance-1-pro.

## 🚀 Features

- **Storyboard Generation**: Create 60-second video scripts with 12 scenes
- **Character Creation**: Generate character prompts and images
- **Setting Creation**: Generate setting prompts and images
- **Scene Combination**: Combine characters and settings into cohesive scenes
- **Video Generation**: Create high-quality videos from scenes

## 📋 Prerequisites

- Python 3.8+
- Replicate API token
- FastAPI and dependencies

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-reel-maker
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   REPLICATE_API_TOKEN=your_replicate_api_token_here
   ```

4. **Run the application**

   ```bash
   uvicorn api.main:app --reload
   ```

5. **Access the API**
   - API Documentation: http://localhost:8000/docs
   - Alternative docs: http://localhost:8000/redoc

## ⚙️ Automated Workflow

You can run the end-to-end pipeline with a single script. It will:

- Generate the storyboard (12 scenes, 1 character throughout)
- Create the character prompt and image
- For Scene 1 only: create setting prompt + setting image, then combine with character
- For Scenes 2-12: extract a frame from the previous scene's video and reuse it as the `initial_image`
- Generate each 5-second scene video (uses the scene's description directly as the prompt)
- Merge all scene videos into a single 60-second video

Run:

```bash
python run_workflow.py
```

Notes:

- The script defaults to: "A professional parkour athlete navigates a city filled with unexpected obstacles."
- It does not call `/video-prompt`; instead it passes each scene's `description` directly to `/generate-video`.

## 🎬 API Workflow

### Step 1: Generate Storyboard

```bash
POST /storyboard
{
  "idea": "A detective investigating a mysterious case in a dimly lit office"
}
```

### Step 2: Create Character

```bash
# Generate character prompt
POST /character-prompt
{
  "description": "A detective in his 40s with a weathered face",
  "name": "Detective Smith"
}

# Generate character image
POST /character-image
{
  "prompt": "Detailed character prompt from previous step"
}
```

### Step 3: For Each Scene (12 scenes total)

**Note**:

- **Scene 1**: Create setting (setting-prompt + setting-image)
- **Scenes 2-12**: Reuse the same setting from Scene 1, but extract a frame from the previous scene's video to use as the `initial_image` for the current scene's video generation

#### 3a. Create Setting (Scene 1 only)

```bash
# Generate setting prompt (only for Scene 1)
POST /setting-prompt
{
  "description": "A dimly lit office with evidence scattered on desk"
}

# Generate setting image (only for Scene 1)
POST /setting-image
{
  "prompt": "Detailed setting prompt from previous step"
}
```

#### 3b. Combine Character and Setting

```bash
# Generate combination prompt
POST /combine-prompt
{
  "scene_description": "Detective examining evidence in the office"
}

# Generate combined scene image
POST /combine-image
{
  "prompt": "Combination prompt from previous step",
  "character_image": "URL from character-image",
  "setting_image": "URL from setting-image (Scene 1) OR reuse from Scene 1 (Scenes 2-12)"
}
```

#### 3c. Extract Frame from Video (Required for scenes 2-12)

```bash
# Extract a representative frame from the previous scene's video
# This frame becomes the initial_image for the next scene's video generation
POST /extract-frame
{
  "video_url": "URL from the previous scene's generated video"
}
```

#### 3d. Generate Video

```bash
# Generate video prompt (optional)
POST /video-prompt
{
  "scene_description": "Detective examining evidence in the office"
}

# Generate final video
POST /generate-video
{
  "prompt": "Either the video prompt (above) OR the scene description directly",
  "initial_image": "URL from combine-image (for scene 1) OR extracted frame URL (for scenes 2-12)"
}
```

### Step 4: Add Sound Effects (Optional)

```bash
# Add sound effects to individual videos or the final merged video
POST /add-sound-effect
{
  "video_url": "URL from any generated video"
}
```

### Step 5: Merge All Scene Videos (After all 12 scenes are generated)

```bash
# Merge all generated scene videos into one final video
POST /merge-videos
{
  "video_urls": [
    "URL from scene 1 video",
    "URL from scene 2 video",
    "URL from scene 3 video",
    "... (all 12 scene video URLs)"
  ]
}
```

## 🌐 Browser Testing

### Using the Interactive API Documentation

1. **Open your browser** and navigate to:

   ```
   http://localhost:8000/docs
   ```

2. **Test each endpoint** by:
   - Clicking on any endpoint (e.g., `/storyboard`)
   - Clicking "Try it out"
   - Entering the required JSON data
   - Clicking "Execute"
   - Viewing the response

### Example Browser Test Sequence

#### 1. Test Storyboard Generation

- **Endpoint**: `POST /storyboard`
- **Request Body**:
  ```json
  {
    "idea": "A young woman discovers time travel"
  }
  ```
- **Expected Response**: JSON with characters and 12 scenes

#### 2. Test Character Creation

- **Endpoint**: `POST /character-prompt`
- **Request Body**:
  ```json
  {
    "description": "A young woman in her 20s with curious eyes",
    "name": "Emma"
  }
  ```
- **Expected Response**: Detailed character prompt

- **Endpoint**: `POST /character-image`
- **Request Body**:
  ```json
  {
    "prompt": "Generated character prompt from previous step"
  }
  ```
- **Expected Response**: Character image URL

#### 3. Test Setting Creation (Scene 1 only)

- **Endpoint**: `POST /setting-prompt`
- **Request Body**:
  ```json
  {
    "description": "A mysterious laboratory with glowing equipment"
  }
  ```
- **Expected Response**: Detailed setting prompt

- **Endpoint**: `POST /setting-image`
- **Request Body**:
  ```json
  {
    "prompt": "Generated setting prompt from previous step"
  }
  ```
- **Expected Response**: Setting image URL (reuse this URL for all subsequent scenes)

#### 4. Test Scene Combination

- **Endpoint**: `POST /combine-prompt`
- **Request Body**:
  ```json
  {
    "scene_description": "Emma discovers a time machine in the laboratory"
  }
  ```
- **Expected Response**: Combination prompt

- **Endpoint**: `POST /combine-image`
- **Request Body**:
  ```json
  {
    "prompt": "Generated combination prompt",
    "character_image": "Character image URL",
    "setting_image": "Setting image URL"
  }
  ```
- **Expected Response**: Combined scene image URL

#### 5. Test Frame Extraction (Required for scenes 2-12)

- **Endpoint**: `POST /extract-frame`
- **Request Body**:
  ```json
  {
    "video_url": "https://example.com/previous-scene-video.mp4"
  }
  ```
- **Expected Response**: Extracted frame image URL (use as `initial_image` for next scene)

#### 6. Test Video Generation

- **Endpoint**: `POST /video-prompt`
- **Request Body**:
  ```json
  {
    "scene_description": "Emma discovers a time machine in the laboratory"
  }
  ```
- **Expected Response**: Video generation prompt

- **Endpoint**: `POST /generate-video`
- **Request Body**:
  ```json
  {
    "prompt": "Generated video prompt",
    "initial_image": "Combined scene image URL"
  }
  ```
- **Expected Response**: Generated video URL

#### 7. Test Sound Effects (Optional)

- **Endpoint**: `POST /add-sound-effect`
- **Request Body**:
  ```json
  {
    "video_url": "https://example.com/generated-video.mp4"
  }
  ```
- **Expected Response**: Video with sound effects added

#### 8. Test Video Merging (After all scenes are generated)

- **Endpoint**: `POST /merge-videos`
- **Request Body**:
  ```json
  {
    "video_urls": ["https://example.com/scene1-video.mp4", "https://example.com/scene2-video.mp4", "https://example.com/scene3-video.mp4"]
  }
  ```
- **Expected Response**: Merged video file path (in production, this would be a cloud storage URL)

## 📊 API Endpoints

| Endpoint            | Method | Description                                                   | Input                                                   | Output                             |
| ------------------- | ------ | ------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------- |
| `/storyboard`       | POST   | Generate 60-second storyboard                                 | `idea: str`                                             | JSON with characters and 12 scenes |
| `/character-prompt` | POST   | Create character prompt                                       | `description: str, name: str`                           | Character prompt                   |
| `/character-image`  | POST   | Generate character image                                      | `prompt: str`                                           | Character image URL                |
| `/setting-prompt`   | POST   | Create setting prompt (Scene 1 only)                          | `description: str`                                      | Setting prompt                     |
| `/setting-image`    | POST   | Generate setting image (Scene 1 only)                         | `prompt: str`                                           | Setting image URL                  |
| `/combine-prompt`   | POST   | Create combination prompt                                     | `scene_description: str`                                | Combination prompt                 |
| `/combine-image`    | POST   | Combine character and setting                                 | `prompt: str, character_image: str, setting_image: str` | Combined image URL                 |
| `/extract-frame`    | POST   | Extract frame from video (required for scenes 2-12)           | `video_url: str`                                        | Extracted frame image URL          |
| `/video-prompt`     | POST   | Create video prompt (optional; not used by `run_workflow.py`) | `scene_description: str`                                | Video generation prompt            |
| `/generate-video`   | POST   | Generate final video                                          | `prompt: str, initial_image: str`                       | Video URL                          |
| `/add-sound-effect` | POST   | Add sound effects to video                                    | `video_url: str`                                        | Video with sound effects           |
| `/merge-videos`     | POST   | Merge multiple videos into one                                | `video_urls: List[str]`                                 | Merged video file path             |

## 🔧 Technical Details

### Response Format

All endpoints return JSON responses with:

```json
{
  "status": "success" | "error",
  "message": "Description of the result",
  "data": "Response data (if applicable)",
  "url": "Generated URL (if applicable)"
}
```

## 📝 Notes

- **Storyboard**: Generates exactly 12 scenes with one single character throughout
- **Character Images**: 1:1 aspect ratio, pitch black background
- **Setting Images**: 16:9 aspect ratio, cinematic style (created once for Scene 1, reused for all scenes)
- **Combined Images**: 16:9 aspect ratio, professional quality
- **Frame Extraction**: Required for scenes 2-12, uses intelligent frame selection (not just first frame)
- **Videos**: 5-second duration, 480p resolution, 24 FPS
- **Video Merging**: Combines all 12 scene videos into one final 60-second video using MoviePy
