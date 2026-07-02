export const brand = {
  name: "Vidora",
  tagline: "Turn ideas into vivid cinematic videos.",
  note: "Static demo output. No live generation or API tokens are used on this page.",
} as const;

export const promptExample =
  "A woman watches a heavy rainstorm from her window, finding peaceful joy in a warm indoor space.";

export const pipelineSteps = [
  {
    title: "Storyboard",
    description: "Break an idea into a 12-scene sequence built for a 60-second reel.",
  },
  {
    title: "Character",
    description: "Generate a consistent subject that carries the story across every shot.",
  },
  {
    title: "Setting",
    description: "Create the visual world and atmosphere for the first frame.",
  },
  {
    title: "Scene continuity",
    description: "Use extracted frames to keep each new scene connected to the last.",
  },
  {
    title: "Sound",
    description: "Add ambient audio to make the generated reel feel more complete.",
  },
  {
    title: "Merge",
    description: "Join every clip into one polished, shareable video.",
  },
] as const;

export const modelStack = [
  {
    name: "Gemini 2.5 Flash",
    role: "Storyboards, captions, prompts",
    mark: "G",
    stage: "Script",
    markStyle: "gemini",
  },
  {
    name: "Minimax Image-01",
    role: "Character and setting images",
    mark: "M",
    stage: "Images",
    markStyle: "minimax",
  },
  {
    name: "FLUX Kontext Pro",
    role: "Cohesive character-setting frames",
    mark: "F",
    stage: "Frames",
    markStyle: "flux",
  },
  {
    name: "Seedance 1 Pro",
    role: "5-second scene clips",
    mark: "S",
    stage: "Clips",
    markStyle: "seedance",
  },
  {
    name: "Sound FX",
    role: "Atmosphere and audio texture",
    mark: "FX",
    stage: "Audio",
    markStyle: "sound",
  },
  {
    name: "Merge",
    role: "Final reel assembly",
    mark: "M+",
    stage: "Reel",
    markStyle: "merge",
  },
] as const;

export const pipelineFlow = [
  {
    title: "Script",
    model: "Gemini 2.5 Flash",
    description: "Expands the story idea into scenes, captions, and generation prompts.",
  },
  {
    title: "Images",
    model: "Minimax Image-01",
    description: "Creates character references and setting images for the reel world.",
  },
  {
    title: "Frames",
    model: "FLUX Kontext Pro",
    description: "Combines character and setting images into cohesive shot frames.",
  },
  {
    title: "Clips",
    model: "Seedance 1 Pro",
    description: "Generates short motion clips for each scene in the storyboard.",
  },
  {
    title: "Audio",
    model: "Sound FX",
    description: "Adds atmosphere and audio polish to the generated reel.",
  },
  {
    title: "Reel",
    model: "Merge",
    description: "Joins every generated clip into one shareable final output.",
  },
] as const;

export const demoVideos = [
  {
    title: "Vidora in action",
    subtitle: "Sound-designed final reel",
    src: "/videos/demo-1.mp4",
    audio: "Final mix",
    featured: true,
  },
  {
    title: "Pre-sound-design cut",
    subtitle: "Generated reel before audio polish",
    src: "/videos/demo-2.mp4",
    audio: "Raw cut",
    featured: false,
  },
] as const;

export const metrics = [
  { label: "Scenes", value: "12" },
  { label: "Runtime", value: "60s" },
  { label: "Mode", value: "Static demo" },
] as const;
