"use client";

import { FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({ text, className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const words = text.split(" ");
  const wordCount = words.length;

  useEffect(() => {
    const syncMobile = () => setIsMobile(window.innerWidth < 768);
    syncMobile();
    window.addEventListener("resize", syncMobile);
    return () => window.removeEventListener("resize", syncMobile);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const paragraph = paragraphRef.current;
    if (!section || !container || !paragraph) return;

    const wordEls = Array.from(paragraph.querySelectorAll<HTMLElement>(".word-unit"));
    if (!wordEls.length) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion || isMobile) {
        gsap.set(wordEls, { opacity: 1 });
        return;
      }

      gsap.set(wordEls, { opacity: 0.14 });

      const scrollDistance = Math.max(wordCount * 34, 760);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: container,
          scrub: 0.38,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      wordEls.forEach((word, i) => {
        tl.to(
          word,
          { opacity: 1, duration: 0.38, ease: "none" },
          i * 0.38,
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isMobile, prefersReducedMotion, wordCount]);

  const simplifiedLayout = prefersReducedMotion || isMobile;

  return (
    <div ref={sectionRef} className={cn("relative z-20 bg-background", className)}>
      <div
        ref={containerRef}
        className={cn(
          "relative z-10 flex w-full items-center justify-center overflow-hidden bg-background",
          simplifiedLayout ? "min-h-[72svh] px-4 py-24 md:min-h-[84svh]" : "h-[100svh] will-change-transform",
        )}
      >
        <div className="relative mx-auto max-w-7xl px-8 lg:px-16">
          <p
            ref={paragraphRef}
            className="relative flex flex-wrap text-4xl font-semibold leading-[1.15] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {words.map((word, i) => (
              <span key={i} className="word-unit mr-[0.25em] last:mr-0 text-foreground">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export { TextRevealByWord };
