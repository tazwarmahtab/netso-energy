import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { LOGO_LOOP_EXACT_COMPOSITION, LOGO_LOOP_POSES, type LogoLoopPose } from "./logo-loop-data";

type LogoLoopExactFrameProps = {
  frame?: number;
  still?: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

const smoothstep = (value: number) => value * value * (3 - 2 * value);

const parseColor = (value: string) => {
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    const normalized = hex.length === 3 ? hex.split("").map((part) => `${part}${part}`).join("") : hex;
    const int = Number.parseInt(normalized, 16);
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255,
      a: 1,
    };
  }

  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) {
    return { r: 255, g: 255, b: 255, a: 1 };
  }

  const [r, g, b, a = "1"] = match[1].split(",").map((part) => part.trim());
  return {
    r: Number(r),
    g: Number(g),
    b: Number(b),
    a: Number(a),
  };
};

const mixColor = (from: string, to: string, progress: number) => {
  const start = parseColor(from);
  const end = parseColor(to);
  return `rgba(${mix(start.r, end.r, progress).toFixed(2)}, ${mix(start.g, end.g, progress).toFixed(2)}, ${mix(
    start.b,
    end.b,
    progress,
  ).toFixed(2)}, ${mix(start.a, end.a, progress).toFixed(4)})`;
};

const resolvePoseWindow = (frame: number) => {
  const poses = LOGO_LOOP_POSES;
  for (let i = 0; i < poses.length - 1; i += 1) {
    const current = poses[i];
    const next = poses[i + 1];
    if (frame < next.frame) {
      return { current, next };
    }
  }

  const last = poses[poses.length - 1];
  return { current: last, next: last };
};

const getProgress = (frame: number, current: LogoLoopPose, next: LogoLoopPose) => {
  if (current.frame === next.frame) {
    return 0;
  }

  const relative = clamp((frame - current.frame) / (next.frame - current.frame), 0, 1);
  return smoothstep(relative);
};

const addJitter = (value: number, frame: number, index: number, axisBias: number) => {
  const amplitude = 0.04;
  return (
    value +
    Math.sin(frame * 0.09 + index * 0.7 + axisBias) * amplitude +
    Math.cos(frame * 0.05 + index * 1.3 + axisBias) * amplitude * 0.45
  );
};

export function LogoLoopExactFrame({ frame = 0, still = false }: LogoLoopExactFrameProps) {
  const clampedFrame = clamp(frame, 0, LOGO_LOOP_EXACT_COMPOSITION.durationInFrames - 1);
  const { current, next } = resolvePoseWindow(clampedFrame);
  const progress = still ? 0 : getProgress(clampedFrame, current, next);
  const resolvedBackground = mixColor(current.background, next.background, progress);
  const resolvedStroke = mixColor(current.stroke, next.stroke, progress);

  const rotation = mix(current.rotation, next.rotation, progress);
  const translateX = mix(current.translateX, next.translateX, progress);
  const translateY = mix(current.translateY, next.translateY, progress);
  const scale = mix(current.scale, next.scale, progress);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: resolvedBackground,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "72vh",
          maxHeight: "72vh",
          overflow: "visible",
        }}
        role="img"
        aria-label="Looping geometric wireframe animation"
      >
        <g
          transform={`translate(${translateX} ${translateY}) rotate(${rotation} 50 50) scale(${scale})`}
          style={{ transformOrigin: "50px 50px" }}
        >
          {current.segments.map((segment, index) => {
            const nextSegment = next.segments[index] ?? segment;
            return (
              <line
                key={`${index}-${current.frame}`}
                x1={addJitter(mix(segment[0][0], nextSegment[0][0], progress), clampedFrame, index, 0.1)}
                y1={addJitter(mix(segment[0][1], nextSegment[0][1], progress), clampedFrame, index, 0.6)}
                x2={addJitter(mix(segment[1][0], nextSegment[1][0], progress), clampedFrame, index, 1.1)}
                y2={addJitter(mix(segment[1][1], nextSegment[1][1], progress), clampedFrame, index, 1.6)}
                stroke={resolvedStroke}
                strokeWidth="0.9"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                opacity={0.98}
              />
            );
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
}

export function LogoLoopExact() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return <LogoLoopExactFrame frame={clamp(frame, 0, durationInFrames - 1)} />;
}

export default LogoLoopExact;
