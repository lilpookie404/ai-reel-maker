from fastapi import FastAPI
from .schemas import (
    StoryboardRequest,
    VideoPromptRequest,
    CharacterPromptRequest,
    SettingPromptRequest,
    CharacterImageRequest,
    SettingImageRequest,
    CombinePromptRequest,
    CombineImageRequest,
    GenerateVideoRequest,
    ExtractFrameRequest,
    MergeVideosRequest,
    AddSoundEffectRequest,
)
from .services import (
    StoryboardService,
    VideoPromptService,
    CharacterPromptService,
    SettingPromptService,
    CharacterImageService,
    SettingImageService,
    CombinePromptService,
    CombineImageService,
    GenerateVideoService,
    ExtractFrameService,
    MergeVideosService,
    AddSoundEffectService,
)

app = FastAPI(title="AI Reel Maker API")


# Endpoints
@app.get("/")
def root():
    return {"message": "AI Reel Maker API", "status": "running"}


@app.post("/storyboard")
def create_storyboard(request: StoryboardRequest):
    return StoryboardService.create_storyboard(request.idea)


@app.post("/character-prompt")
def create_character_prompt(request: CharacterPromptRequest):
    return CharacterPromptService.create_character_prompt(
        request.description, request.name
    )


@app.post("/character-image")
def create_character_image(request: CharacterImageRequest):
    return CharacterImageService.create_character_image(request.prompt)


@app.post("/setting-prompt")
def create_setting_prompt(request: SettingPromptRequest):
    return SettingPromptService.create_setting_prompt(request.description)


@app.post("/setting-image")
def create_setting_image(request: SettingImageRequest):
    return SettingImageService.create_setting_image(request.prompt)


@app.post("/combine-prompt")
def combine_prompt(request: CombinePromptRequest):
    return CombinePromptService.combine_prompt(request.scene_description)


@app.post("/combine-image")
def combine_image(request: CombineImageRequest):
    return CombineImageService.combine_image(
        request.prompt, request.character_image, request.setting_image
    )


@app.post("/extract-frame")
def extract_frame(request: ExtractFrameRequest):
    return ExtractFrameService.extract_frame(request.video_url)


@app.post("/video-prompt")
def create_video_prompt(request: VideoPromptRequest):
    return VideoPromptService.create_video_prompt(request.scene_description)


@app.post("/generate-video")
def generate_video(request: GenerateVideoRequest):
    return GenerateVideoService.generate_video(request.prompt, request.initial_image)


@app.post("/merge-videos")
def merge_videos(request: MergeVideosRequest):
    return MergeVideosService.merge_videos(request.video_urls)


@app.post("/add-sound-effect")
def add_sound_effect(request: AddSoundEffectRequest):
    return AddSoundEffectService.add_sound_effect(request.video_url, request.sound_effect)
