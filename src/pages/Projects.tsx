import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import hero from "@/assets/hero-rooftop.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import { StartAssessmentLink } from "@/components/AssessmentCtas";
import { SEO } from "@/components/SEO";
import { useSiteCopy } from "@/lib/site-copy";

const referenceImages = [p1, p2, p3, hero];

type FilterId = "all" | "Residential" | "Commercial";

const Projects = () => {
  const copy = useSiteCopy();
  const [filter, setFilter] = useState<FilterId>("all");

  const filters = useMemo(
    () => [
      { id: "all" as const, label: copy.projects.filters[0] },
      { id: "Residential" as const, label: copy.projects.filters[1] },
      { id: "Commercial" as const, label: copy.projects.filters[2] },
    ],
    [copy.projects.filters],
  );

  const filteredCards =
    filter === "all"
      ? copy.projects.cards
      : copy.projects.cards.filter((card) => card.type === filter);

  return (
    <>
      <SEO path="/projects" />

      <section className="pb-12 pt-40 md:pb-16 md:pt-52">
        <div className="container-tight">
          <p className="eyebrow mb-6 text-primary/80">{copy.projects.eyebrow}</p>
          <h1 className="display-xl max-w-5xl text-balance">{copy.projects.headline}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {copy.projects.body}
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  filter === item.id
                    ? "bg-foreground text-background shadow-lg"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-36">
        <div className="container-tight">
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredCards.map((card, index) => (
                <motion.article
                  key={`${card.title}-${card.location}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group overflow-hidden rounded-[1.8rem] border border-border/60 bg-card shadow-sm transition-colors hover:border-primary/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={referenceImages[index % referenceImages.length]}
                      alt={`${card.title} ${card.location}`}
                      width={900}
                      height={675}
                      className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary/80">
                      {card.location}
                    </div>
                    <h2 className="mt-3 font-display text-2xl tracking-[-0.04em] text-foreground">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{card.system}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 text-center">
            <p className="mb-6 text-lg text-muted-foreground">{copy.projects.ctaBody}</p>
            <StartAssessmentLink
              source="projects-page"
              label={copy.projects.ctaLabel}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
