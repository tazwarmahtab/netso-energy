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
};

export function StartAssessmentLink({
  source,
  className,
  label,
  sessionId,
  calculatorSummary,
}: StartAssessmentLinkProps) {
  const { language } = useLanguage();
  const copy = useSiteCopy();
  const href = buildWhatsAppStartUrl({ language, source, sessionId, calculatorSummary });

  return (
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
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110",
        className,
      )}
    >
      {label ?? copy.common.startAssessment}
      <ArrowRight className="h-4 w-4" />
    </a>
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
        "inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-background/82 px-7 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-secondary/35",
        className,
      )}
    >
      {copy.common.runEstimate}
    </Link>
  );
}
