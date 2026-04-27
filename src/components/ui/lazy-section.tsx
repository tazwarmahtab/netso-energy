import { type ComponentType, type LazyExoticComponent, Suspense, useEffect, useRef, useState } from "react";

type LazySectionProps = {
  component: LazyExoticComponent<ComponentType>;
  className?: string;
  rootMargin?: string;
  minHeight?: number;
  preload?: () => void;
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
  preload,
}: LazySectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

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
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [preload, rootMargin, shouldRender]);

  return (
    <div ref={containerRef} className={className}>
      {shouldRender ? (
        <Suspense fallback={<SectionPlaceholder minHeight={minHeight} />}>
          <Component />
        </Suspense>
      ) : (
        <SectionPlaceholder minHeight={minHeight} />
      )}
    </div>
  );
}
