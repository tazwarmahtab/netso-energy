import heroPoster from "@/assets/custom/hero-video-poster-reference.jpg";
import heroPoster480 from "@/assets/generated/home/hero-poster-480.jpg";
import heroPoster480Avif from "@/assets/generated/home/hero-poster-480.avif";
import heroPoster960Avif from "@/assets/generated/home/hero-poster-960.avif";
import heroBackground from "@/assets/custom/hero-background-reference-optimized.jpg";
import heroBackground640 from "@/assets/generated/home/hero-background-640.jpg";
import heroBackground960 from "@/assets/generated/home/hero-background-960.jpg";
import heroBackground640Avif from "@/assets/generated/home/hero-background-640.avif";
import heroBackground960Avif from "@/assets/generated/home/hero-background-960.avif";
import heroBackground1440Avif from "@/assets/generated/home/hero-background-1440.avif";
import logoPng from "@/assets/new/logo-optimized.png";
import logo160Avif from "@/assets/generated/home/logo-160.avif";
import logo224Avif from "@/assets/generated/home/logo-224.avif";
import problemRooftops from "@/assets/custom/problem-urban-rooftops-optimized.jpg";
import problemRooftops640 from "@/assets/generated/home/problem-rooftops-640.jpg";
import problemRooftops960 from "@/assets/generated/home/problem-rooftops-960.jpg";
import problemRooftops640Avif from "@/assets/generated/home/problem-rooftops-640.avif";
import problemRooftops960Avif from "@/assets/generated/home/problem-rooftops-960.avif";
import problemRooftops1280Avif from "@/assets/generated/home/problem-rooftops-1280.avif";

export const heroBackgroundAvifSources = [
  { src: heroBackground640Avif, width: 640 },
  { src: heroBackground960Avif, width: 960 },
  { src: heroBackground1440Avif, width: 1440 },
];

export const heroBackgroundJpegSources = [
  { src: heroBackground640, width: 640 },
  { src: heroBackground960, width: 960 },
];

export const heroBackgroundFallback = heroBackground;

export const heroPosterAvifSources = [
  { src: heroPoster480Avif, width: 480 },
  { src: heroPoster960Avif, width: 960 },
];

export const heroPosterJpegSources = [{ src: heroPoster480, width: 480 }];

export const heroPosterFallback = heroPoster;
export const heroPosterMobileFallback = heroPoster480;

export const problemRooftopsAvifSources = [
  { src: problemRooftops640Avif, width: 640 },
  { src: problemRooftops960Avif, width: 960 },
  { src: problemRooftops1280Avif, width: 1280 },
];

export const problemRooftopsJpegSources = [
  { src: problemRooftops640, width: 640 },
  { src: problemRooftops960, width: 960 },
];

export const problemRooftopsFallback = problemRooftops;

export const headerLogoAvif = logo224Avif;
export const headerLogoPng = logoPng;
export const mobileHeaderLogoAvif = logo160Avif;
