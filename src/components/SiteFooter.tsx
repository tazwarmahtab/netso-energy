import { StartAssessmentLink } from "@/components/AssessmentCtas";
import { useSiteCopy } from "@/lib/site-copy";

export const SiteFooter = () => {
  const copy = useSiteCopy();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container-tight flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <p className="eyebrow text-foreground/52">{copy.common.brand}</p>
          <h2 className="max-w-2xl font-display text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
            {copy.footer.title}
          </h2>
          <p className="max-w-2xl text-foreground/64">{copy.footer.body}</p>
          <p className="text-sm text-foreground/46">{copy.footer.note}</p>
        </div>

        <div className="flex w-full md:w-auto md:justify-end">
          <StartAssessmentLink
            source="footer"
            label={copy.common.startOnWhatsApp}
            className="w-full md:w-auto"
          />
        </div>
      </div>
    </footer>
  );
};
