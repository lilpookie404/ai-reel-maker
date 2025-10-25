# Simple AI Reel Maker Workflow

## Quick Start

1. **Start the API server** (in one terminal):
   ```bash
   uvicorn api.main:app --reload
   ```

2. **Run the workflow** (in another terminal):
   ```bash
   # Windows
   run_workflow.bat
   
   # Linux/Mac
   ./run_workflow.sh
   
   # Or directly with Python
   python run_workflow.py
   ```

3. **Enter your story idea** when prompted, or press Enter to use the default.

## What it does

The script automatically:
1. Generates a 12-scene storyboard from your idea
2. Creates a character and image
3. For each scene:
   - Creates setting (scene 1 only)
   - Combines character and setting
   - Extracts frame from previous video (scenes 2-12)
   - Generates the scene video
4. Merges all 12 videos into one final video

## Requirements

- API server running on `http://localhost:8000`
- Python with `requests` library installed
- All API dependencies installed

That's it! Simple and straightforward.
