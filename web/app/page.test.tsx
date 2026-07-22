import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Page from "./page";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Vidora homepage", () => {
  it("opens with the real generated reel and a personal project thesis", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { name: /vidora turns scene ideas into reels/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/built by vaishnavi awadhiya/i)).toBeInTheDocument();
    expect(screen.getByText(/i built an api that plans each scene/i)).toBeInTheDocument();
    expect(screen.getByTestId("hero-video")).toHaveAttribute(
      "poster",
      "/frames/dusk-room-01.jpg",
    );
    expect(screen.getByTestId("hero-video")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("link", { name: /follow the build/i })).toHaveAttribute(
      "href",
      "#process",
    );
    expect(screen.queryByText(/operator view/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/control room/i)).not.toBeInTheDocument();
  });

  it("switches between the two generated reels", () => {
    const playSpy = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);
    render(<Page />);

    const video = screen.getByTestId("demo-video");
    expect(video.querySelector("source")).toHaveAttribute("src", "/videos/demo-1.mp4");
    expect(screen.getByRole("button", { name: /show dusky room reel/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /show street scene reel/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    fireEvent.click(screen.getByRole("button", { name: /play dusky room reel/i }));
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: /play dusky room reel/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /show street scene reel/i }));

    expect(screen.getByTestId("demo-video").querySelector("source")).toHaveAttribute(
      "src",
      "/videos/demo-2.mp4",
    );
    expect(screen.getByRole("button", { name: /play street scene reel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show street scene reel/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("shows the seven-stage service route and updates the compositor", () => {
    render(<Page />);

    for (const stage of [
      "storyboard",
      "character",
      "setting",
      "composition",
      "motion",
      "sequence",
      "atmosphere",
    ]) {
      expect(screen.getByTestId(`workflow-node-${stage}`)).toBeInTheDocument();
    }

    expect(screen.getAllByText("Gemini 2.5 Flash").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Minimax Image-01").length).toBeGreaterThan(1);
    expect(screen.getAllByText("FLUX Kontext Apps Multi-Image-Pro").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Seedance-1-Pro").length).toBeGreaterThan(0);
    expect(screen.getAllByText("MoviePy").length).toBeGreaterThan(0);

    const compositor = screen.getByTestId("active-compositor");
    expect(within(compositor).getByText("Gemini 2.5 Flash")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /view motion stage/i }));

    expect(screen.getByRole("button", { name: /view motion stage/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(within(screen.getByTestId("active-compositor")).getByText("Seedance-1-Pro"))
      .toBeInTheDocument();
  });

  it("presents the original FastAPI architecture without hosting filler", () => {
    render(<Page />);

    expect(screen.getByRole("heading", { name: /services, not a black box/i })).toBeInTheDocument();
    expect(screen.getByText(/fastapi at the center/i)).toBeInTheDocument();
    expect(screen.getByText(/one service per responsibility/i)).toBeInTheDocument();
    expect(screen.getAllByText(/post \/storyboard/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/post \/generate-video/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/post \/add-sound-effect/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/static frontend/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vercel deployment/i)).not.toBeInTheDocument();
  });

  it("renders Vaishnavi's portfolio links", () => {
    render(<Page />);

    expect(screen.getByText(/a 2025 ai reel maker by vaishnavi awadhiya/i)).toBeInTheDocument();
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/lilpookie404/vidora");
    expect(githubLink.querySelector(".github-logo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:vaishnaviawadhiya2811@gmail.com",
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/vaishnavi-awadhiya/",
    );
  });
});
