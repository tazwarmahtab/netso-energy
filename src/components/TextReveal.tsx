import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASING, DURATION, STAGGER } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: string;
  className?: string;
  delay?: number;
  trigger?: "scroll" | "immediate" | "manual";
}

export function TextReveal({ children, className = "", delay = 0, trigger = "scroll" }: RevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const lines = containerRef.current.querySelectorAll("[data-reveal-line]");
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      gsap.set(lines, { y: "100%", opacity: 0 });
      
      const anim = gsap.to(lines, {
        y: "0%",
        opacity: 1,
        duration: DURATION.dramatic,
        ease: EASING.reveal,
        stagger: STAGGER.lines,
        delay,
        scrollTrigger: trigger === "scroll" ? { 
          trigger: containerRef.current, 
          start: "top 85%" 
        } : undefined,
      });

      if (trigger === "immediate") {
        anim.play();
      }
    });

    return () => ctx.revert();
  }, [children, delay, trigger]);

  const textLines = children.split("\n").filter((line) => line.trim());

  return (
    <h1 ref={containerRef} className={`overflow-hidden ${className}`}>
      {textLines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.1em]" data-reveal-line>
          <span className="block">{line}</span>
        </span>
      ))}
    </h1>
  );
}

export function WordReveal({ children, className = "", delay = 0, trigger = "scroll" }: RevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const words = containerRef.current.querySelectorAll("[data-reveal-word]");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.set(words, { y: 20, opacity: 0 });
      
      const anim = gsap.to(words, {
        y: 0,
        opacity: 1,
        duration: DURATION.standard,
        ease: EASING.smooth,
        stagger: STAGGER.text,
        delay,
        scrollTrigger: trigger === "scroll" ? { 
          trigger: containerRef.current, 
          start: "top 85%" 
        } : undefined,
      });

      if (trigger === "immediate") {
        anim.play();
      }
    });

    return () => ctx.revert();
  }, [children, delay, trigger]);

  const words = children.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <span data-reveal-word className="inline-block">
            {word}{index < words.length - 1 && "\u00A0"}
          </span>
        </span>
      ))}
    </p>
  );
}
