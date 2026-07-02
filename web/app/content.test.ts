import { describe, expect, it } from "vitest";

import { brand, demoVideos, pipelineSteps } from "./content";

describe("Vidora content", () => {
  it("uses Vidora as the product brand", () => {
    expect(brand.name).toBe("Vidora");
    expect(brand.tagline).toBe("Turn ideas into vivid cinematic videos.");
  });

  it("marks the sound-enhanced video as the main in-action demo", () => {
    const mainVideo = demoVideos.find((video) => video.featured);

    expect(mainVideo?.src).toBe("/videos/demo-1.mp4");
    expect(mainVideo?.audio).toBe("AI-added sound effects");
  });

  it("includes the no-audio demo as a secondary output", () => {
    expect(demoVideos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: "/videos/demo-2.mp4",
          audio: "No audio",
        }),
      ]),
    );
  });

  it("describes the full idea-to-video pipeline", () => {
    expect(pipelineSteps.map((step) => step.title)).toEqual([
      "Storyboard",
      "Character",
      "Setting",
      "Scene continuity",
      "Sound",
      "Merge",
    ]);
  });
});
