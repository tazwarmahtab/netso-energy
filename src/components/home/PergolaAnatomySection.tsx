import { motion } from "framer-motion";
import { BatteryCharging, Building2, SunMedium, Umbrella } from "lucide-react";

import { useSiteCopy } from "@/lib/site-copy";

const layerIcons = [Building2, SunMedium, BatteryCharging, Umbrella];

export const PergolaAnatomySection = () => {
  const copy = useSiteCopy();

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-36">
      <div className="container-tight">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6 text-primary/80">{copy.anatomy.eyebrow}</p>
          <h2 className="display-text text-4xl text-balance text-foreground md:text-6xl">
            {copy.anatomy.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-foreground/72 md:text-lg md:leading-normal">
            {copy.anatomy.body}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {copy.anatomy.layers.map((layer, index) => {
            const Icon = layerIcons[index] ?? Building2;

            return (
              <motion.article
                key={layer.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="ivory-panel group relative flex flex-col justify-between rounded-[1.75rem] p-7 transition-all duration-500 hover:border-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.24em] text-primary/75">
                      Layer 0{index + 1}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground text-background transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl tracking-[-0.02em] text-foreground">
                    {layer.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-6 text-foreground/68">
                    {layer.body}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-border/70 bg-secondary/20 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground/80">Engineering note: </span>
          {copy.anatomy.note}
        </div>
      </div>
    </section>
  );
};
