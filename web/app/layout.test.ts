import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Bricolage_Grotesque: () => ({ variable: "--font-bricolage-grotesque" }),
  IBM_Plex_Mono: () => ({ variable: "--font-ibm-plex-mono" }),
  Instrument_Sans: () => ({ variable: "--font-instrument-sans" }),
}));

import { metadata } from "./layout";

describe("Vidora metadata", () => {
  it("includes production metadata for previews", () => {
    expect(metadata.title).toBe("Vidora | AI Reel Maker by Vaishnavi Awadhiya");
    expect(metadata.description).toBe(
      "Explore how Vaishnavi Awadhiya built Vidora, a modular AI pipeline that turns one scene idea into a complete reel.",
    );
    expect(metadata.openGraph).toMatchObject({
      title: "Vidora | AI Reel Maker by Vaishnavi Awadhiya",
      description:
        "Explore how Vaishnavi Awadhiya built Vidora, a modular AI pipeline that turns one scene idea into a complete reel.",
      type: "website",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Vidora | AI Reel Maker by Vaishnavi Awadhiya",
    });
  });
});
