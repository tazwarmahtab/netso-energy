import { Player } from "@remotion/player";
import { LogoLoopExactFrame, LogoLoopExact } from "@/remotion/LogoLoopExact";
import { LOGO_LOOP_EXACT_COMPOSITION } from "@/remotion/logo-loop-data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function LogoLoopScene() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      data-testid="logo-loop-page"
      data-motion-mode={prefersReducedMotion ? "reduced" : "animated"}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <div className="relative h-screen w-screen overflow-hidden">
        {prefersReducedMotion ? (
          <div data-testid="logo-loop-still" className="h-full w-full">
            <LogoLoopExactFrame frame={120} still />
          </div>
        ) : (
          <Player
            component={LogoLoopExact}
            durationInFrames={LOGO_LOOP_EXACT_COMPOSITION.durationInFrames}
            fps={LOGO_LOOP_EXACT_COMPOSITION.fps}
            compositionWidth={LOGO_LOOP_EXACT_COMPOSITION.width}
            compositionHeight={LOGO_LOOP_EXACT_COMPOSITION.height}
            controls={false}
            autoPlay
            loop
            showVolumeControls={false}
            clickToPlay={false}
            style={{
              width: "max(100vw, calc(100vh * 4 / 3))",
              height: "max(100vh, calc(100vw * 3 / 4))",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              overflow: "hidden",
            }}
            inputProps={{}}
          />
        )}
      </div>
    </section>
  );
}
