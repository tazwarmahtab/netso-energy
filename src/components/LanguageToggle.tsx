import { useLanguage } from "@/lib/i18n";
import { useSiteCopy } from "@/lib/site-copy";
import { cn } from "@/lib/utils";

type LanguageToggleProps = {
  className?: string;
  variant?: "pill" | "inline";
};

export function LanguageToggle({
  className,
  variant = "pill",
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  const copy = useSiteCopy();
  const isInline = variant === "inline";

  return (
    <div
      className={cn(
        isInline
          ? "inline-grid grid-cols-2 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-[0.72rem] uppercase tracking-[0.18em]"
          : "inline-flex items-center rounded-full border border-border/70 bg-background/85 p-1 text-sm",
        className,
      )}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={cn(
          isInline
            ? "min-w-[3.6rem] rounded-full px-3 py-2 text-center transition-colors"
            : "rounded-full px-3 py-1.5 transition-colors",
          language === "en"
            ? isInline
              ? "bg-primary text-primary-foreground"
              : "bg-foreground text-background"
            : isInline
              ? "text-white/52 hover:text-white"
              : "text-muted-foreground hover:text-foreground",
        )}
        aria-pressed={language === "en"}
        aria-label={copy.common.english}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("bn")}
        className={cn(
          isInline
            ? "min-w-[3.6rem] rounded-full px-3 py-2 text-center transition-colors"
            : "rounded-full px-3 py-1.5 transition-colors",
          language === "bn"
            ? isInline
              ? "bg-primary text-primary-foreground"
              : "bg-foreground text-background"
            : isInline
              ? "text-white/52 hover:text-white"
              : "text-muted-foreground hover:text-foreground",
        )}
        aria-pressed={language === "bn"}
        aria-label={copy.common.bangla}
      >
        বাং
      </button>
    </div>
  );
}
