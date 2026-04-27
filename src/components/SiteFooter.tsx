import { Link } from "react-router-dom";

import { EstimateLink, StartAssessmentLink } from "@/components/AssessmentCtas";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useSiteCopy } from "@/lib/site-copy";

export const SiteFooter = () => {
  const copy = useSiteCopy();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container-tight flex flex-col gap-10 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-4">
            <p className="eyebrow text-primary/80">{copy.common.brand}</p>
            <h2 className="max-w-2xl font-display text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
              {copy.footer.title}
            </h2>
            <p className="max-w-2xl text-white/72">{copy.footer.body}</p>
            <p className="text-sm text-white/64">{copy.footer.note}</p>
          </div>

          <div className="space-y-4">
            <LanguageToggle />
            <div className="flex flex-col gap-3 sm:flex-row">
              <StartAssessmentLink source="footer" className="w-full sm:w-auto" />
              <EstimateLink source="footer" className="w-full sm:w-auto" />
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap gap-3" aria-label="Footer">
          {copy.nav.items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="rounded-full border border-border/60 px-4 py-2 text-sm text-white/72 transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/feasibility"
            className="rounded-full border border-border/60 px-4 py-2 text-sm text-white/72 transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {copy.common.fallbackForm}
          </Link>
        </nav>
      </div>
    </footer>
  );
};
