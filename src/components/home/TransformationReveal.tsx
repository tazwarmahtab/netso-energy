import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteCopy } from "@/lib/site-copy";
import t1 from "@/assets/transform-1-empty.jpg";
import t2 from "@/assets/custom/transform-2-structure-optimized.jpg";
import t3 from "@/assets/transform-3-solar.jpg";
import t4 from "@/assets/custom/transform-5-lifestyle-optimized.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

type StageOverlayProps = {
  stage: {
    img: string;
    label: string;
    desc: string;
    width: number;
    height: number;
    objectPosition?: string;
    energyFlow?: boolean;
  };
  progress: number;
  index: number;
  total: number;
  prefersReducedMotion: boolean;
};

const StageOverlay = ({ stage, progress, index, total, prefersReducedMotion }: StageOverlayProps) => {
  const step = 1 / (total - 1);
  const center = index * step;
  const distance = Math.abs(progress - center);
  const normalized = clamp(1 - distance / step);
  const opacity = clamp(normalized * 1.1);
  const scale = 1.04 - normalized * 0.04;
  const imageScale = 1.08 - normalized * 0.06;
  const showEnergyFlow = stage.energyFlow && normalized > 0.72 && !prefersReducedMotion;

  return (
    <div
      className="absolute inset-0 h-full w-full"
      style={{
        opacity,
        transform: `scale(${scale})`,
        zIndex: Math.round(opacity * 10),
      }}
    >
      <img
        src={stage.img}
        alt={stage.label}
        width={stage.width}
        height={stage.height}
        className="h-full w-full object-cover brightness-[0.5]"
        style={{ transform: `scale(${imageScale})`, objectPosition: stage.objectPosition ?? "center center" }}
      />

      {showEnergyFlow ? (
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {[220, 420, 620, 820, 980].map((y, i) => (
              <motion.line
                key={i}
                x1="0"
                y1={y}
                x2="1920"
                y2={y}
                stroke="#c8b2ff"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.35, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={400 + i * 300}
                cy="-20"
                r="8"
                fill="#c8b2ff"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 1100, opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "linear",
                }}
              />
            ))}
          </svg>
          <motion.div
            className="absolute bottom-[20%] left-[10%] h-24 w-24 rounded-full border border-primary/30 bg-primary/10"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      ) : null}

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[15] h-[42vh] w-[min(78vw,58rem)] -translate-x-1/2 -translate-y-1/2 rounded-full readability-spotlight" />

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container-tight text-center">
          <div className="readability-panel-dark mx-auto max-w-3xl rounded-[2rem] px-6 py-7 md:px-10 md:py-10">
            <p className="eyebrow mb-6 text-primary/85">{stage.label}</p>
            <h2 className="text-shadow-soft display-lg mx-auto max-w-2xl text-balance text-white">
              {stage.desc}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TransformationReveal = () => {
  const copy = useSiteCopy();
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const progressRef = useRef(0);

  const stages = useMemo(
    () => [
      { img: t1, label: copy.transformation.stages[0].title, desc: copy.transformation.stages[0].body, width: 1920, height: 1080 },
      { img: t2, label: copy.transformation.stages[1].title, desc: copy.transformation.stages[1].body, width: 1536, height: 1024, objectPosition: "38% center" },
      { img: t3, label: copy.transformation.stages[2].title, desc: copy.transformation.stages[2].body, width: 1920, height: 1080 },
      { img: t3, label: copy.transformation.stages[3].title, desc: copy.transformation.stages[3].body, width: 1920, height: 1080, energyFlow: true },
      { img: t4, label: copy.transformation.stages[4].title, desc: copy.transformation.stages[4].body, width: 1024, height: 1536, objectPosition: "center 62%" },
    ],
    [copy.transformation.stages],
  );

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const section = containerRef.current;
    if (!section || typeof window === "undefined") return;

    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    const distance = isMobile ? window.innerHeight * 1.5 : window.innerHeight * 2.15;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${distance}`,
      pin: true,
      scrub: isMobile ? 0.42 : 0.24,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const nextProgress = Number(self.progress.toFixed(4));
        if (nextProgress !== progressRef.current) {
          progressRef.current = nextProgress;
          setProgress(nextProgress);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile, prefersReducedMotion, stages]);

  return (
    <section ref={containerRef} className="relative bg-night">
      <div className="relative flex h-[100svh] w-full items-center overflow-hidden">
        {stages.map((stage, index) => (
          <StageOverlay
            key={stage.label}
            stage={stage}
            progress={progress}
            index={index}
            total={stages.length}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}

        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {stages.map((_, index) => {
            const step = 1 / (stages.length - 1);
            const start = index * step;
            const nextStop = index === stages.length - 1 ? 1 : start + step;
            const fill = clamp((progress - start) / Math.max(nextStop - start, 0.001));
            const width = 14 + fill * 34;

            return (
              <div
                key={index}
                className="h-1 rounded-full bg-primary/20"
                style={{ width: `${width}px` }}
              >
                <div className="h-full rounded-full bg-primary" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
