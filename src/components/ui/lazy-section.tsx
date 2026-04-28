import { type ComponentType, type LazyExoticComponent, Suspense, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type LazySectionProps = {
  component: LazyExoticComponent<ComponentType>;
  className?: string;
  rootMargin?: string;
  minHeight?: number;
  mobileMinHeight?: number;
  preload?: () => void;
  eagerOnIdle?: boolean;
};

const SectionPlaceholder = ({ minHeight = 320 }: { minHeight?: number }) => (
  <div
    aria-hidden="true"
    className="w-full rounded-[2rem] border border-border/40 bg-secondary/12"
    style={{ minHeight }}
  />
);

export function LazySection({
  component: Component,
  className,
  rootMargin = "420px 0px",
  minHeight = 320,
  mobileMinHeight,
  preload,
  eagerOnIdle = false,
}: LazySectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const isMobile = useIsMobile();
  const placeholderHeight = isMobile
    ? mobileMinHeight ?? Math.max(280, Math.round(minHeight * 0.58))
    : minHeight;
  const resolvedRootMargin = isMobile ? "220px 0px" : rootMargin;

  useEffect(() => {
    if (shouldRender) {
      preload?.();
      return;
    }

    const node = containerRef.current;
    if (!node || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setShouldRender(true);
        preload?.();
        observer.disconnect();
      },
      { rootMargin: resolvedRootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [preload, resolvedRootMargin, shouldRender]);

  useEffect(() => {
    if (!eagerOnIdle || shouldRender || typeof window === "undefined") return;

    let cancelled = false;
    const triggerRender = () => {
      if (cancelled) return;
      setShouldRender(true);
      preload?.();
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(triggerRender, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(triggerRender, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [eagerOnIdle, preload, shouldRender]);

  return (
    <div ref={containerRef} className={className}>
      {shouldRender ? (
        <Suspense fallback={<SectionPlaceholder minHeight={placeholderHeight} />}>
          <Component />
        </Suspense>
      ) : (
        <SectionPlaceholder minHeight={placeholderHeight} />
      )}
    </div>
  );
}
