import { Composition } from "remotion";
import LogoLoopExact from "./LogoLoopExact";
import { LOGO_LOOP_EXACT_COMPOSITION } from "./logo-loop-data";

export const RemotionRoot = () => {
  return (
    <Composition
      id={LOGO_LOOP_EXACT_COMPOSITION.id}
      component={LogoLoopExact}
      durationInFrames={LOGO_LOOP_EXACT_COMPOSITION.durationInFrames}
      fps={LOGO_LOOP_EXACT_COMPOSITION.fps}
      width={LOGO_LOOP_EXACT_COMPOSITION.width}
      height={LOGO_LOOP_EXACT_COMPOSITION.height}
    />
  );
};

export default RemotionRoot;
