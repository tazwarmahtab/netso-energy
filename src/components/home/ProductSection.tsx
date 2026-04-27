import { motion } from "framer-motion";
import { ClipboardCheck, ImagePlus, MapPinned, MessageSquare } from "lucide-react";

import { StartAssessmentLink } from "@/components/AssessmentCtas";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteCopy } from "@/lib/site-copy";
import productVideo from "@/assets/new/product-showcase.mp4";

export const ProductSection = () => {
  const copy = useSiteCopy();
  const prefersReducedMotion = useReducedMotion();
  const specs = [
    { ...copy.products.specs[0], icon: MapPinned },
    { ...copy.products.specs[1], icon: ImagePlus },
    { ...copy.products.specs[2], icon: ClipboardCheck },
    { ...copy.products.specs[3], icon: MessageSquare },
  ];
  const repeatedSpecs = [...specs, ...specs, ...specs, ...specs];

  return (
    <section className="relative overflow-hidden bg-background py-32 md:py-56">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="group ivory-panel relative aspect-[4/5] overflow-hidden rounded-[1.9rem] lg:aspect-auto lg:h-[800px]"
            >
              {/* Noise Overlay to hide compression artifacts - Fixed with data URI to avoid 404 */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
                }}
              />
              
              <video
                src={productVideo}
                autoPlay={!prefersReducedMotion}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover contrast-[1.02] brightness-[1.02] saturate-[1.06]"
              />

              <div className="readability-panel-light absolute right-8 top-8 z-20 rounded-full px-4 py-2">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {copy.products.outputBadge}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-primary/30" />
                <span className="eyebrow text-primary/80">{copy.products.eyebrow}</span>
              </div>

              <h2 className="display-xl text-foreground text-balance">
                {copy.products.headline}
              </h2>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/72">
                {copy.products.body}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <StartAssessmentLink source="product-section" />
            </motion.div>
          </div>
        </div>

      </div>

      <div className="relative left-1/2 mt-14 w-[calc(100vw+2.5rem)] -translate-x-1/2 overflow-hidden md:w-[calc(100vw+4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ivory-panel relative overflow-hidden rounded-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/90 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/90 to-transparent" />
            {prefersReducedMotion ? (
              <div className="no-scrollbar overflow-x-auto snap-x snap-mandatory">
                <div className="flex min-w-max items-center gap-4 px-6 py-5">
                  {specs.map((spec) => (
                    <div key={spec.label} className="inline-flex min-w-max snap-start items-center gap-4 rounded-full border border-border/70 bg-secondary/38 px-5 py-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-secondary/70 text-primary/70">
                        <spec.icon className="h-4 w-4" />
                      </span>
                      <span className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                        {spec.label}
                      </span>
                      <span className="font-display text-[1.4rem] tracking-[-0.04em] text-foreground">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="no-scrollbar overflow-x-auto snap-x snap-mandatory md:hidden">
                  <div className="flex min-w-max items-center gap-4 px-6 py-5">
                    {specs.map((spec) => (
                      <div key={spec.label} className="inline-flex min-w-max items-center gap-4 rounded-full border border-border/70 bg-secondary/38 px-5 py-3 snap-start">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-secondary/70 text-primary/70">
                          <spec.icon className="h-4 w-4" />
                        </span>
                        <span className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                          {spec.label}
                        </span>
                        <span className="font-display text-[1.4rem] tracking-[-0.04em] text-foreground">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="group hidden overflow-hidden md:flex">
                  <div className="flex min-w-max items-center gap-0 px-10 py-5 motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
                    {repeatedSpecs.map((spec, i) => (
                      <div key={`${spec.label}-${i}`} className="inline-flex min-w-max items-center gap-4 px-8">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-secondary/70 text-primary/70">
                          <spec.icon className="h-4 w-4" />
                        </span>
                        <span className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                          {spec.label}
                        </span>
                        <span className="font-display text-[clamp(1.55rem,2vw,2.05rem)] tracking-[-0.04em] text-foreground">
                          {spec.value}
                        </span>
                        <span className="ml-2 h-5 w-px bg-border" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
