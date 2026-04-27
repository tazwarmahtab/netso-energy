import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LogoLoop from "@/pages/LogoLoop";
import { LOGO_LOOP_EXACT_COMPOSITION } from "@/remotion/logo-loop-data";

vi.mock("@remotion/player", () => ({
  Player: ({
    autoPlay,
    loop,
    durationInFrames,
    fps,
    compositionWidth,
    compositionHeight,
  }: {
    autoPlay?: boolean;
    loop?: boolean;
    durationInFrames: number;
    fps: number;
    compositionWidth: number;
    compositionHeight: number;
  }) => (
    <div
      data-testid="remotion-player"
      data-autoplay={String(Boolean(autoPlay))}
      data-loop={String(Boolean(loop))}
      data-duration={durationInFrames}
      data-fps={fps}
      data-width={compositionWidth}
      data-height={compositionHeight}
    />
  ),
}));

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

describe("logo loop route", () => {
  beforeEach(() => {
    setReducedMotion(false);
  });

  it("mounts the standalone logo loop route", () => {
    render(
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
        initialEntries={["/logo-loop"]}
      >
        <Routes>
          <Route path="/logo-loop" element={<LogoLoop />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("logo-loop-page")).toBeInTheDocument();
    expect(screen.getByTestId("remotion-player")).toBeInTheDocument();
  });

  it("renders the static motion-safe mode when reduced motion is requested", () => {
    setReducedMotion(true);
    render(
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
        initialEntries={["/logo-loop"]}
      >
        <Routes>
          <Route path="/logo-loop" element={<LogoLoop />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("logo-loop-page")).toHaveAttribute("data-motion-mode", "reduced");
    expect(screen.getByTestId("logo-loop-still")).toBeInTheDocument();
  });

  it("uses the fixed exact-match composition metadata", () => {
    expect(LOGO_LOOP_EXACT_COMPOSITION).toMatchObject({
      id: "LogoLoopExact",
      width: 1600,
      height: 1200,
      fps: 100,
      durationInFrames: 690,
    });
  });
});
