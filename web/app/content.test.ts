import { describe, expect, it } from "vitest";

import { brand, demoVideos, endpoints, workflowStages } from "./content";

describe("Vidora content", () => {
  it("makes the project personal and specific", () => {
    expect(brand.name).toBe("Vidora");
    expect(brand.creator).toBe("Vaishnavi Awadhiya");
    expect(brand.tagline).toMatch(/modular ai reel maker/i);
    expect(brand.sourceIdea).toMatch(/girl coding in her room/i);
    expect(brand.note).toMatch(/i built vidora/i);
  });

  it("uses the dusky room reel as the featured output", () => {
    const mainVideo = demoVideos.find((video) => video.featured);

    expect(mainVideo?.title).toBe("Dusky room");
    expect(mainVideo?.src).toBe("/videos/demo-1.mp4");
    expect(mainVideo?.poster).toBe("/frames/dusk-room-01.jpg");
    expect(mainVideo?.audio).toBe("Ambient sound");
    expect(mainVideo?.brief).toMatch(/dusky outside/i);
  });

  it("keeps the earlier reel as a separate orchestration run", () => {
    expect(demoVideos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Street scene",
          src: "/videos/demo-2.mp4",
          poster: "/frames/street-scene.jpg",
          audio: "Visual study",
        }),
      ]),
    );
  });

  it("describes the real seven-stage pipeline from the original build", () => {
    expect(workflowStages.map((stage) => stage.id)).toEqual([
      "storyboard",
      "character",
      "setting",
      "composition",
      "motion",
      "sequence",
      "atmosphere",
    ]);
    expect(workflowStages.map((stage) => stage.tool)).toEqual([
      "Gemini 2.5 Flash",
      "Minimax Image-01",
      "Minimax Image-01",
      "FLUX Kontext Apps Multi-Image-Pro",
      "Seedance-1-Pro",
      "MoviePy",
      "Minimax Audio + MoviePy",
    ]);
    expect(workflowStages.every((stage) => stage.logoSrc.startsWith("/logos/"))).toBe(true);
    expect(workflowStages.every((stage) => stage.endpoint.startsWith("/"))).toBe(true);
    expect(workflowStages.every((stage) => stage.input && stage.output)).toBe(true);
  });

  it("lists every FastAPI route shown in the project walkthrough", () => {
    expect(endpoints).toEqual([
      "/storyboard",
      "/character-prompt",
      "/character-image",
      "/setting-prompt",
      "/setting-image",
      "/combine-image",
      "/generate-video",
      "/merge-video",
      "/add-sound-effect",
    ]);
  });
});
