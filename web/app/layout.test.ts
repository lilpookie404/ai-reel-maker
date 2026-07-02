import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
  Space_Grotesk: () => ({ variable: "--font-space-grotesk" }),
}));

import { metadata } from "./layout";

describe("Vidora metadata", () => {
  it("includes production metadata for static Vercel previews", () => {
    expect(metadata.title).toBe("Vidora | AI Reel Demo");
    expect(metadata.description).toBe(
      "A static AI reel pipeline showcase with generated demo videos, model flow, and Vidora project proof.",
    );
    expect(metadata.openGraph).toMatchObject({
      title: "Vidora | AI Reel Demo",
      description:
        "A static AI reel pipeline showcase with generated demo videos, model flow, and Vidora project proof.",
      type: "website",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Vidora | AI Reel Demo",
    });
  });
});
