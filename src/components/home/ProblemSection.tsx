import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ResponsiveImage } from "@/components/ui/responsive-image";
import {
  problemRooftopsAvifSources,
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
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-32 md:py-56">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-10 text-primary/80"
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
              className="space-y-8"
            >
              <p className="text-xl leading-relaxed text-foreground/72">
                {copy.problem.body}
              </p>

              <div className="border-t ivory-rule pt-8">
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
          className="ivory-panel relative mt-24 aspect-[16/9] overflow-hidden rounded-[2rem] lg:aspect-[21/9]"
        >
          <ResponsiveImage
            alt="Dhaka rooftops aerial view"
            className="absolute inset-0 h-full w-full object-cover brightness-[0.96] saturate-[0.82]"
            decoding="async"
            fallbackSrc={problemRooftopsFallback}
            fallbackSources={problemRooftopsJpegSources}
            loading="lazy"
            sizes="(min-width: 1280px) 1180px, calc(100vw - 2rem)"
            sources={problemRooftopsAvifSources}
          />

          <div className="absolute inset-y-0 left-0 z-10 w-full max-w-[44rem] bg-gradient-to-r from-background via-background/90 via-45% to-transparent" />

          <motion.div
            className="pointer-events-none absolute inset-y-0 z-20 w-40 bg-primary/12 blur-[1px]"
            style={{
              x: lightX,
              opacity: lightOpacity,
            }}
          />

          <div className="absolute bottom-8 left-8 z-30 max-w-md md:bottom-10 md:left-10">
            <div className="readability-panel-light rounded-[1.5rem] p-5 md:p-6">
              <p className="eyebrow mb-2 text-primary/85">{copy.problem.imageEyebrow}</p>
              <p className="text-2xl font-display text-balance text-foreground md:text-[2rem]">
                {copy.problem.imageBody}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {copy.problem.cards.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + (i * 0.1) }}
              className="ivory-surface flex flex-col gap-4 rounded-[1.75rem] p-6 md:p-8"
            >
              <p className="font-display text-3xl font-medium tracking-[-0.05em] text-foreground md:text-4xl">{s.title}</p>
              <p className="max-w-[16rem] text-sm leading-snug text-muted-foreground">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
