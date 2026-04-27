import { cn } from "@/lib/utils";
import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import { EASING, DURATION } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    gsap.to(button, { 
      x: distanceX * 0.15, 
      y: distanceY * 0.15, 
      duration: DURATION.micro, 
      ease: EASING.magnetic 
    });
    gsap.to(content, { 
      x: distanceX * 0.1, 
      y: distanceY * 0.1, 
      duration: DURATION.micro, 
      ease: EASING.magnetic 
    });
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    gsap.to(buttonRef.current, { 
      x: 0, 
      y: 0, 
      duration: DURATION.fast, 
      ease: EASING.precision 
    });
    gsap.to(contentRef.current, { 
      x: 0, 
      y: 0, 
      duration: DURATION.fast, 
      ease: EASING.precision 
    });
  }, [prefersReducedMotion]);

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition-shadow duration-150 ease-out",
    variant === "primary" && "bg-primary text-primary-foreground hover:brightness-110",
    variant === "secondary" && "border border-border/80 bg-background text-foreground hover:bg-secondary",
    size === "lg" && "px-8 py-4 text-sm tracking-wide",
    size === "md" && "px-6 py-3 text-sm",
    className
  );

  return (
    <button
      ref={buttonRef}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span ref={contentRef} className="relative flex flex-col overflow-hidden">
        <span className="inline-flex transition-transform duration-300 ease-cinematic group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute left-0 top-full inline-flex transition-transform duration-300 ease-cinematic group-hover:-translate-y-full">
          {children}
        </span>
      </span>
    </button>
  );
}
