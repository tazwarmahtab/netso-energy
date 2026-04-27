type Point = readonly [number, number];
type Segment = readonly [Point, Point];

export type LogoLoopPose = {
  frame: number;
  background: string;
  stroke: string;
  rotation: number;
  translateX: number;
  translateY: number;
  scale: number;
  snapFromPrevious?: boolean;
  segments: readonly Segment[];
};

export const LOGO_LOOP_EXACT_COMPOSITION = {
  id: "LogoLoopExact",
  width: 1600,
  height: 1200,
  fps: 100,
  durationInFrames: 690,
} as const;

export const LOGO_LOOP_REFERENCE_FRAMES = [
  0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680,
] as const;

const DARK_BG = "#020202";
const LIGHT_BG = "#f3f3f0";
const DARK_STROKE = "rgba(255,255,255,0.8)";
const LIGHT_STROKE = "rgba(36,36,36,0.66)";

const rectangleSegments = [
  [[42, 24], [58, 24]],
  [[58, 24], [58, 40]],
  [[58, 40], [58, 58]],
  [[58, 58], [58, 76]],
  [[58, 76], [42, 76]],
  [[42, 76], [42, 58]],
  [[42, 58], [42, 40]],
  [[42, 40], [42, 24]],
  [[42, 49], [58, 49]],
  [[42, 60], [58, 60]],
  [[50, 24], [50, 76]],
  [[50, 50], [50, 50]],
] as const satisfies readonly Segment[];

const cubeSegments = [
  [[50, 18], [58, 23]],
  [[58, 23], [66, 28]],
  [[66, 28], [66, 46]],
  [[66, 46], [66, 64]],
  [[66, 64], [58, 69]],
  [[58, 69], [50, 74]],
  [[50, 74], [34, 64]],
  [[34, 64], [34, 28]],
  [[50, 18], [50, 74]],
  [[34, 28], [50, 46]],
  [[66, 28], [50, 46]],
  [[50, 46], [50, 46]],
] as const satisfies readonly Segment[];

const hexagonSegments = [
  [[44, 22], [52, 22]],
  [[52, 22], [60, 22]],
  [[60, 22], [70, 36]],
  [[70, 36], [60, 52]],
  [[60, 52], [52, 52]],
  [[52, 52], [44, 52]],
  [[44, 52], [34, 36]],
  [[34, 36], [44, 22]],
  [[52, 22], [52, 52]],
  [[34, 36], [60, 52]],
  [[70, 36], [44, 22]],
  [[52, 36], [52, 36]],
] as const satisfies readonly Segment[];

const circleSegments = [
  [[50, 20], [60, 23]],
  [[60, 23], [68, 30]],
  [[68, 30], [72, 40]],
  [[72, 40], [72, 52]],
  [[72, 52], [68, 62]],
  [[68, 62], [60, 69]],
  [[60, 69], [50, 72]],
  [[50, 72], [40, 69]],
  [[40, 69], [32, 62]],
  [[32, 62], [28, 52]],
  [[28, 52], [28, 40]],
  [[28, 40], [50, 20]],
] as const satisfies readonly Segment[];

export const LOGO_LOOP_POSES: readonly LogoLoopPose[] = [
  {
    frame: 0,
    background: DARK_BG,
    stroke: DARK_STROKE,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    scale: 1,
    segments: rectangleSegments,
  },
  {
    frame: 70,
    background: DARK_BG,
    stroke: DARK_STROKE,
    rotation: -2,
    translateX: 0.12,
    translateY: 0.18,
    scale: 0.995,
    segments: rectangleSegments,
  },
  {
    frame: 110,
    background: DARK_BG,
    stroke: DARK_STROKE,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    scale: 1,
    segments: cubeSegments,
  },
  {
    frame: 210,
    background: DARK_BG,
    stroke: DARK_STROKE,
    rotation: -3,
    translateX: 0.2,
    translateY: -0.1,
    scale: 0.998,
    segments: cubeSegments,
  },
  {
    frame: 270,
    background: DARK_BG,
    stroke: DARK_STROKE,
    rotation: 0,
    translateX: 0.05,
    translateY: -0.05,
    scale: 1,
    segments: [
      [[48, 19], [57, 22.6]],
      [[57, 22.6], [64, 26.5]],
      [[64, 26.5], [67, 41]],
      [[67, 41], [64, 57]],
      [[64, 57], [58, 63]],
      [[58, 63], [49, 63]],
      [[49, 63], [38, 56]],
      [[38, 56], [36, 31]],
      [[51, 20], [51.6, 58]],
      [[37, 31], [57, 63]],
      [[67, 41], [45, 21]],
      [[51, 42], [51, 42]],
    ],
  },
  {
    frame: 280,
    background: DARK_BG,
    stroke: DARK_STROKE,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    scale: 1,
    segments: hexagonSegments,
  },
  {
    frame: 345,
    background: LIGHT_BG,
    stroke: LIGHT_STROKE,
    rotation: 2,
    translateX: 0.12,
    translateY: 0,
    scale: 1,
    segments: hexagonSegments,
  },
  {
    frame: 360,
    background: LIGHT_BG,
    stroke: LIGHT_STROKE,
    rotation: 2,
    translateX: 0.12,
    translateY: 0,
    scale: 0.998,
    segments: hexagonSegments,
  },
  {
    frame: 430,
    background: LIGHT_BG,
    stroke: LIGHT_STROKE,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    scale: 1,
    segments: circleSegments,
  },
  {
    frame: 520,
    background: LIGHT_BG,
    stroke: LIGHT_STROKE,
    rotation: -1,
    translateX: -0.1,
    translateY: 0.1,
    scale: 1,
    segments: [
      [[48, 20], [58, 21.8]],
      [[58, 21.8], [67, 27.5]],
      [[67, 27.5], [72, 38.5]],
      [[72, 38.5], [72, 51.5]],
      [[72, 51.5], [68, 62]],
      [[68, 62], [60, 68.5]],
      [[60, 68.5], [50, 72]],
      [[50, 72], [40, 68.5]],
      [[40, 68.5], [32, 62]],
      [[32, 62], [28, 51.5]],
      [[28, 51.5], [28, 38.5]],
      [[28, 38.5], [48, 20]],
    ],
  },
  {
    frame: 590,
    background: LIGHT_BG,
    stroke: LIGHT_STROKE,
    rotation: -2,
    translateX: -0.15,
    translateY: 0.2,
    scale: 1,
    segments: circleSegments,
  },
  {
    frame: 610,
    background: LIGHT_BG,
    stroke: LIGHT_STROKE,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    scale: 1,
    segments: rectangleSegments,
  },
  {
    frame: 650,
    background: LIGHT_BG,
    stroke: LIGHT_STROKE,
    rotation: -1,
    translateX: 0.08,
    translateY: 0.1,
    scale: 0.998,
    segments: rectangleSegments,
  },
  {
    frame: 689,
    background: DARK_BG,
    stroke: DARK_STROKE,
    rotation: 0,
    translateX: 0,
    translateY: 0,
    scale: 1,
    segments: rectangleSegments,
  },
] as const;
