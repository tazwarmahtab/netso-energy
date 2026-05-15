import { motion } from "framer-motion";
import { StartAssessmentLink } from "@/components/AssessmentCtas";
import { useSiteCopy } from "@/lib/site-copy";

const DELIVERY_TASKS = [
  {
    task: "Restore visible calculator sliders",
    commit: "5716ce1",
    prRequired: true,
  },
  {
    task: "Restore previous hero split text treatment",
    commit: "e863f2a",
    prRequired: true,
  },
  {
    task: "Refine mobile UX and harden WhatsApp funnel",
    commit: "33bf2b8",
    prRequired: true,
  },
  {
    task: "Restore hero wordmark blend treatment",
    commit: "507c835",
    prRequired: false,
  },
  {
    task: "Improve homepage performance and restore WhatsApp intake CTAs",
    commit: "82fc2f1",
    prRequired: true,
  },
] as const;

export const FinalCta = () => {
  const copy = useSiteCopy();

  return (
    <section className="relative overflow-hidden bg-background py-32 md:py-40">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="ivory-panel relative overflow-hidden rounded-[2rem] border border-border/70 p-10 text-center md:p-20"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-primary/30" />

          <p className="eyebrow mb-6 text-primary/80">{copy.finalCta.eyebrow}</p>
          <h2 className="display-text text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto text-balance">
            {copy.finalCta.headline}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            {copy.finalCta.body}
          </p>
          <StartAssessmentLink
            source="final-cta"
            label={copy.common.joinReviewQueue}
            className="mt-10"
          />
        </motion.div>

        <div className="mt-10 rounded-3xl border border-border/70 bg-card/55 p-6 md:p-8">
          <p className="eyebrow text-primary/80">Delivery tracker · Updated May 15, 2026</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">Netso-energy task → PR status</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground md:text-base">
            {DELIVERY_TASKS.map((item) => (
              <li key={item.commit} className="flex flex-wrap items-center justify-between gap-3">
                <span>
                  {item.task} <span className="font-mono text-xs text-foreground/70">({item.commit})</span>
                </span>
                <span className="rounded-full border border-border/70 px-3 py-1 text-xs font-medium uppercase tracking-wide text-foreground">
                  {item.prRequired ? "PR required" : "No PR needed"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
