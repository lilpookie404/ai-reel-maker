export const brand = {
  name: "Vidora",
  creator: "Vaishnavi Awadhiya",
  tagline: "A modular AI reel maker built by Vaishnavi Awadhiya.",
  sourceIdea: "A girl coding in her room while it is dusky outside.",
  note:
    "I built Vidora to see how far one scene idea could travel when every creative decision had its own service.",
} as const;

export const workflowStages = [
  {
    id: "storyboard",
    title: "Shape the story",
    shortTitle: "Story",
    tool: "Gemini 2.5 Flash",
    provider: "Google",
    endpoint: "/storyboard",
    logoSrc: "/logos/gemini.svg",
    logoAlt: "Gemini logo",
    input: "One scene idea",
    description:
      "Gemini turns the idea into a scene-by-scene plan with descriptions, captions, characters, and a consistent tone.",
    output: "Storyboard and scene prompts",
    artifact: "Scene plan",
    imageSrc: "/frames/dusk-room-01.jpg",
    visual: "story",
  },
  {
    id: "character",
    title: "Define the character",
    shortTitle: "Character",
    tool: "Minimax Image-01",
    provider: "Minimax",
    endpoint: "/character-prompt + /character-image",
    logoSrc: "/logos/minimax.svg",
    logoAlt: "Minimax logo",
    input: "Character notes from the storyboard",
    description:
      "The character service expands appearance, expression, and pose, then creates a reusable full-body reference.",
    output: "Character prompt and reference",
    artifact: "Character reference",
    imageSrc: "/frames/dusk-room-02.jpg",
    visual: "character",
  },
  {
    id: "setting",
    title: "Build the setting",
    shortTitle: "Setting",
    tool: "Minimax Image-01",
    provider: "Minimax",
    endpoint: "/setting-prompt + /setting-image",
    logoSrc: "/logos/minimax.svg",
    logoAlt: "Minimax logo",
    input: "Location, light, and atmosphere",
    description:
      "A separate setting service turns the scene location into a wide environment with cinematic framing and light.",
    output: "16:9 environment reference",
    artifact: "Setting reference",
    imageSrc: "/frames/dusk-room-04.jpg",
    visual: "setting",
  },
  {
    id: "composition",
    title: "Compose the frame",
    shortTitle: "Frame",
    tool: "FLUX Kontext Apps Multi-Image-Pro",
    provider: "Black Forest Labs",
    endpoint: "/combine-image",
    logoSrc: "/logos/flux.svg",
    logoAlt: "FLUX logo",
    input: "Character and setting references",
    description:
      "FLUX blends both references into one coherent scene, matching the subject to the environment, depth, and light.",
    output: "A connected scene frame",
    artifact: "Composed frame",
    imageSrc: "/frames/dusk-room-03.jpg",
    visual: "composition",
  },
  {
    id: "motion",
    title: "Move the scene",
    shortTitle: "Motion",
    tool: "Seedance-1-Pro",
    provider: "ByteDance",
    endpoint: "/generate-video",
    logoSrc: "/logos/bytedance.svg",
    logoAlt: "ByteDance logo",
    input: "The composed frame",
    description:
      "Each prepared frame becomes a five-second clip with camera movement and subject action derived from the scene plan.",
    output: "Five-second scene clip",
    artifact: "Motion clip",
    imageSrc: "/frames/dusk-room-03.jpg",
    visual: "motion",
  },
  {
    id: "sequence",
    title: "Sequence the clips",
    shortTitle: "Sequence",
    tool: "MoviePy",
    provider: "Python",
    endpoint: "/merge-video",
    logoSrc: "/logos/merge.svg",
    logoAlt: "Merge workflow mark",
    input: "Completed scene clips",
    description:
      "As each scene finishes, the merge route progressively joins it to the growing visual sequence.",
    output: "One continuous visual sequence",
    artifact: "Assembled scenes",
    imageSrc: "/frames/dusk-room-04.jpg",
    visual: "sequence",
  },
  {
    id: "atmosphere",
    title: "Add atmosphere",
    shortTitle: "Sound",
    tool: "Minimax Audio + MoviePy",
    provider: "Minimax and Python",
    endpoint: "/add-sound-effect",
    logoSrc: "/logos/sound-fx.svg",
    logoAlt: "Sound workflow mark",
    input: "The assembled visual sequence",
    description:
      "Scene-aware ambience such as typing, rain, and room tone is generated, then MoviePy combines picture and sound.",
    output: "A playable reel with ambient sound",
    artifact: "Complete reel",
    imageSrc: "/frames/dusk-room-01.jpg",
    visual: "atmosphere",
  },
] as const;

export const demoVideos = [
  {
    title: "Dusky room",
    subtitle: "Generated from the source idea",
    brief: "A girl coding in her room while it is dusky outside.",
    note: "The full orchestration route, including scene-aware ambience.",
    src: "/videos/demo-1.mp4",
    poster: "/frames/dusk-room-01.jpg",
    audio: "Ambient sound",
    featured: true,
  },
  {
    title: "Street scene",
    subtitle: "An earlier orchestration run",
    brief:
      "A man eating from a pizza box on a quiet street, reconstructed from the generated result.",
    note: "An earlier visual run created before the ambience service was added.",
    src: "/videos/demo-2.mp4",
    poster: "/frames/street-scene.jpg",
    audio: "Visual study",
    featured: false,
  },
] as const;

export const architectureNotes = [
  {
    title: "FastAPI at the center",
    description:
      "The application exposes a clear route for every generation step, so the workflow can be called and inspected stage by stage.",
  },
  {
    title: "One service per responsibility",
    description:
      "Storyboard, character, setting, composition, motion, sound, and assembly logic live in focused service classes.",
  },
  {
    title: "Artifacts move forward",
    description:
      "Each service receives the previous stage's output, adds one creative layer, and passes a concrete artifact onward.",
  },
] as const;

export const endpoints = [
  "/storyboard",
  "/character-prompt",
  "/character-image",
  "/setting-prompt",
  "/setting-image",
  "/combine-image",
  "/generate-video",
  "/merge-video",
  "/add-sound-effect",
] as const;
