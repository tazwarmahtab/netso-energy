import { motion } from "framer-motion";
import { FileText, ImagePlus, MessageSquareMore, ScanSearch } from "lucide-react";

import { EstimateLink, StartAssessmentLink } from "@/components/AssessmentCtas";
import { SEO } from "@/components/SEO";
import { useSiteCopy } from "@/lib/site-copy";

const stepIcons = [MessageSquareMore, FileText, ImagePlus, ScanSearch];

const HowItWorks = () => {
  const copy = useSiteCopy();

  return (
    <>
      <SEO path="/how-it-works" />

      <section className="relative pb-20 pt-40 md:pb-28 md:pt-52">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-45" />
        <div className="container-tight">
          <p className="eyebrow mb-6 text-primary/80">{copy.howItWorks.eyebrow}</p>
          <h1 className="display-text max-w-4xl text-5xl text-balance md:text-7xl">
            {copy.howItWorks.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {copy.howItWorks.body}
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-36">
        <div className="container-tight">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {copy.howItWorks.steps.map((step, index) => {
              const Icon = stepIcons[index] ?? MessageSquareMore;

              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="ivory-panel rounded-[1.8rem] p-8"
                >
                  <div className="mb-8 flex items-start justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      0{index + 1}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h2 className="font-display text-3xl tracking-[-0.04em] text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
                  {step.detail ? (
                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-primary/80">
                      {step.detail}
                    </p>
                  ) : null}
                </motion.article>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col gap-3 sm:flex-row">
            <StartAssessmentLink
              source="how-it-works"
              label={copy.howItWorks.ctaLabel}
            />
            <EstimateLink source="how-it-works" />
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
