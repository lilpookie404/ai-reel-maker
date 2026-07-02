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

export const demoVideos = [
  {
    title: "Vidora in action",
    subtitle: "Finished 60-second reel",
    src: "/videos/demo-1.mp4",
    audio: "AI-added sound effects",
    featured: true,
  },
  {
    title: "Raw video output",
    subtitle: "Generated reel before audio enhancement",
    src: "/videos/demo-2.mp4",
    audio: "No audio",
    featured: false,
  },
] as const;

export const metrics = [
  { label: "Scenes", value: "12" },
  { label: "Runtime", value: "60s" },
  { label: "Mode", value: "Static demo" },
] as const;
