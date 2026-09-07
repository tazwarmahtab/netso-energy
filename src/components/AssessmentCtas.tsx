import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "@/lib/i18n";
import { useSiteCopy } from "@/lib/site-copy";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppStartUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type StartAssessmentLinkProps = {
  source: string;
  className?: string;
  label?: string;
  sessionId?: string;
  calculatorSummary?: string;
  showHandoffNote?: boolean;
  handoffNoteClassName?: string;
};

export function StartAssessmentLink({
  source,
  className,
  label,
  sessionId,
  calculatorSummary,
  showHandoffNote = false,
  handoffNoteClassName,
}: StartAssessmentLinkProps) {
  const { language } = useLanguage();
  const copy = useSiteCopy();
  const href = buildWhatsAppStartUrl({ language, source, sessionId, calculatorSummary });

  const link = (
    <a
      href={href}
      onClick={() =>
        trackEvent("cta_start_assessment", {
          source,
          language,
          sessionId: sessionId ?? null,
          calculatorSummary: calculatorSummary ?? null,
        })
      }
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {label ?? copy.common.startAssessment}
      <ArrowRight className="h-4 w-4" />
    </a>
  );

  if (!showHandoffNote) {
    return link;
  }

  return (
    <div className="flex flex-col gap-2">
      {link}
      <p
        className={cn(
          "text-xs leading-relaxed text-muted-foreground",
          handoffNoteClassName,
        )}
      >
        {copy.common.whatsappHandoffNote}
      </p>
    </div>
  );
}

export function EstimateLink({
  className,
  source = "shared",
  onClick,
}: {
  className?: string;
  source?: string;
  onClick?: () => void;
}) {
  const copy = useSiteCopy();
  const { language } = useLanguage();

  return (
    <Link
      to="/#savings-estimate"
      onClick={() => {
        trackEvent("cta_run_estimate", { source, language });
        onClick?.();
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-background/82 px-7 py-4 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary/35 hover:bg-secondary/35 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {copy.common.runEstimate}
    </Link>
  );
}
