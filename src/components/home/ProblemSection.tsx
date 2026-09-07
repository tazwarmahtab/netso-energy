import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ResponsiveImage } from "@/components/ui/responsive-image";
import {
  problemRooftopsFallback,
  problemRooftopsJpegSources,
} from "@/lib/homepage-media";
import { useSiteCopy } from "@/lib/site-copy";

export const ProblemSection = () => {
  const copy = useSiteCopy();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Light overlay moves across as user scrolls
  const lightX = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-20 md:py-56">
      <div className="container-tight">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-6 text-primary/80 md:mb-10"
            >
              {copy.problem.eyebrow}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl max-w-[11ch] text-balance text-foreground"
            >
              {copy.problem.headline}
            </motion.h2>
          </div>

          <div className="lg:col-span-5 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 md:space-y-8"
            >
              <p className="max-w-[22rem] text-base leading-8 text-foreground/72 md:max-w-none md:text-xl md:leading-relaxed">
                {copy.problem.body}
              </p>

              <div className="border-t ivory-rule pt-6 md:pt-8">
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-px bg-primary/40 group-hover:w-16 transition-all duration-500" />
                  <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    {copy.problem.opportunityLabel}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="ivory-panel relative mt-16 overflow-hidden rounded-[1.75rem] md:mt-24 md:rounded-[2rem]"
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
            <ResponsiveImage
              alt="Dhaka rooftops aerial view"
              className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.9] saturate-[0.96]"
              decoding="async"
              fallbackSrc={problemRooftopsFallback}
              loading="eager"
              modernType="image/jpeg"
              sizes="(min-width: 1280px) 1180px, calc(100vw - 2rem)"
              sources={problemRooftopsJpegSources}
            />

            <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.03)_100%)]" />
            <div className="absolute inset-y-0 left-0 z-10 w-full max-w-[30rem] bg-gradient-to-r from-background/18 via-background/8 to-transparent" />

            <motion.div
              className="pointer-events-none absolute inset-y-0 z-20 w-40 bg-primary/12 blur-[1px]"
              style={{
                x: lightX,
                opacity: lightOpacity,
              }}
            />

            <div className="absolute bottom-5 left-5 right-5 z-30 max-w-md sm:bottom-8 sm:left-8 md:bottom-10 md:left-10">
              <div className="readability-panel-light rounded-[1.35rem] p-4 sm:rounded-[1.5rem] sm:p-5 md:p-6">
                <p className="eyebrow mb-1 text-[0.72rem] text-primary/85 sm:mb-2 sm:text-xs">{copy.problem.imageEyebrow}</p>
                <p className="text-xl font-display text-balance text-foreground sm:text-2xl md:text-[2rem]">
                  {copy.problem.imageBody}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {copy.problem.cards.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + (i * 0.1) }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[1.85rem] border border-border/80 bg-gradient-to-b from-background/90 to-secondary/35 p-6 shadow-sm transition-all duration-500 hover:border-primary/40 md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/75">
                  Issue 0{i + 1}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 transition-colors group-hover:bg-primary" />
              </div>
              <div className="mt-8 space-y-3">
                <p className="font-display text-2xl font-medium tracking-[-0.04em] text-foreground md:text-3xl">
                  {s.title}
                </p>
                <p className="text-[0.92rem] leading-6 text-foreground/68 md:text-sm md:leading-relaxed">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
