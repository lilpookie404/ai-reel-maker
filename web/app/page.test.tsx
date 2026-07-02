import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Page from "./page";

afterEach(() => {
  cleanup();
});

describe("Vidora homepage", () => {
  it("renders the product video stage with Watch Film overlay and segmented video controls", () => {
    const { container } = render(<Page />);
    const playSpy = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);

    expect(screen.getByText("Vidora")).toBeInTheDocument();
    expect(screen.getByText(/product video/i)).toBeInTheDocument();
    expect(screen.getByText(/see vidora in action/i)).toBeInTheDocument();
    const watchFilmButton = screen.getByRole("button", { name: /watch film/i });
    expect(watchFilmButton).toBeInTheDocument();

    const video = screen.getByTestId("demo-video");
    expect(video.querySelector("source")).toHaveAttribute("src", "/videos/demo-1.mp4");
    expect(screen.getByRole("button", { name: /show final mix/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /show raw cut/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getAllByTestId("demo-video")).toHaveLength(1);
    expect(screen.queryByText(/no audio/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /switch to raw cut/i })).not.toBeInTheDocument();
    expect(container.querySelector(".lucide-scissors")).not.toBeInTheDocument();

    fireEvent.click(watchFilmButton);

    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: /watch film/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show raw cut/i }));

    const switchedVideo = screen.getByTestId("demo-video");
    expect(switchedVideo.querySelector("source")).toHaveAttribute("src", "/videos/demo-2.mp4");
    expect(screen.getByRole("button", { name: /watch film/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show raw cut/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /show final mix/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("renders the redesigned Vidora hero", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        name: /turn story ideas into cinematic reels/i,
      }),
    ).toBeInTheDocument();
  });

  it("presents the real model stack as a logo-style flow", () => {
    render(<Page />);

    expect(screen.getAllByText("Gemini 2.5 Flash").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Minimax Image-01").length).toBeGreaterThan(0);
    expect(screen.getAllByText("FLUX Kontext Pro").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Seedance 1 Pro").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sound FX").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Merge").length).toBeGreaterThan(0);
    expect(screen.getByText(/Storyboards, captions, prompts/i)).toBeInTheDocument();
    expect(screen.getAllByText("Script").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Images").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Frames").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Clips").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Audio").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Reel").length).toBeGreaterThan(0);
  });

  it("renders the portfolio footer with contact links", () => {
    render(<Page />);

    expect(screen.getByText("© 2025 Vidora. All rights reserved.")).toBeInTheDocument();
    expect(screen.getByText("designed and built by vaishnavi <3")).toBeInTheDocument();
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/lilpookie404",
    );
    expect(githubLink).not.toHaveTextContent("GH");
    expect(githubLink.querySelector(".github-logo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:vaishnaviawadhiya2811@gmail.com",
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/vaishnavi-awadhiya/",
    );
    expect(screen.queryByRole("link", { name: /twitter/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^x$/i })).not.toBeInTheDocument();
  });
});
