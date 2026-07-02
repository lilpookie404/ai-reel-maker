import { describe, expect, it } from "vitest";

import { brand, demoVideos, modelStack, pipelineFlow } from "./content";

describe("Vidora content", () => {
  it("uses Vidora as the product brand", () => {
    expect(brand.name).toBe("Vidora");
    expect(brand.tagline).toBe("Turn ideas into vivid cinematic videos.");
  });

  it("marks the sound-enhanced video as the main in-action demo", () => {
    const mainVideo = demoVideos.find((video) => video.featured);

    expect(mainVideo?.src).toBe("/videos/demo-1.mp4");
    expect(mainVideo?.audio).toBe("Final mix");
  });

  it("includes the raw cut as a secondary output", () => {
    expect(demoVideos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: "/videos/demo-2.mp4",
          audio: "Raw cut",
        }),
      ]),
    );
  });

  it("describes the real multi-model stack behind the generated videos", () => {
    expect(modelStack.map((model) => model.name)).toEqual([
      "Gemini 2.5 Flash",
      "Minimax Image-01",
      "FLUX Kontext Pro",
      "Seedance 1 Pro",
      "Sound FX",
      "Merge",
    ]);
  });

  it("compresses the full idea-to-video flow into landing-page steps", () => {
    expect(pipelineFlow.map((step) => step.title)).toEqual([
      "Script",
      "Images",
      "Frames",
      "Clips",
      "Audio",
      "Reel",
    ]);
  });
});
