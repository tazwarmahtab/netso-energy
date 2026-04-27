import { cn } from "@/lib/utils";

type SectionFadeTransitionProps = {
  className?: string;
  darkTop?: boolean;
};

export function SectionFadeTransition({
  className,
  darkTop = false,
}: SectionFadeTransitionProps) {
  return (
    <section
      aria-hidden="true"
      className={cn(
        "relative h-20 overflow-hidden bg-background sm:h-28",
        darkTop &&
          "before:absolute before:inset-x-0 before:top-0 before:h-16 before:bg-gradient-to-b before:from-black/14 before:to-transparent before:content-['']",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(200,178,255,0.14),transparent_52%),linear-gradient(to_bottom,transparent,rgba(244,237,227,0.94)_55%,rgba(244,237,227,1))]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-border/80" />
    </section>
  );
}
