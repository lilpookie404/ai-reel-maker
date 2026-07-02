import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "./page";

describe("Vidora homepage", () => {
  it("renders the Vidora product hero and demo videos", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        name: /turn ideas into vivid cinematic videos/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Vidora")).toBeInTheDocument();
    expect(screen.getByText(/see vidora in action/i)).toBeInTheDocument();
    expect(screen.getAllByText(/AI-added sound effects/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/No audio/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("demo-video")).toHaveLength(2);
  });
});
