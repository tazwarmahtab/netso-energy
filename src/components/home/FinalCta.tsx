import { motion } from "framer-motion";
import { StartAssessmentLink } from "@/components/AssessmentCtas";
import { useSiteCopy } from "@/lib/site-copy";

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
          <StartAssessmentLink source="final-cta" className="mt-10" />
        </motion.div>
      </div>
    </section>
  );
};
