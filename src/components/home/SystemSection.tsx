import { motion } from "framer-motion";
import { Sun, Cpu, TrendingUp } from "lucide-react";
import { useSiteCopy } from "@/lib/site-copy";

export const SystemSection = () => {
  const copy = useSiteCopy();
  const steps = [
    { icon: Sun, ...copy.system.steps[0] },
    { icon: Cpu, ...copy.system.steps[1] },
    { icon: TrendingUp, ...copy.system.steps[2] },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-40">
      <div className="container-tight">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6 text-primary/80">{copy.system.eyebrow}</p>
          <h2 className="display-text text-4xl text-balance text-foreground md:text-6xl">
            {copy.system.headline}
          </h2>
          <p className="mt-4 max-w-[22rem] text-base leading-8 text-foreground/72 md:mt-6 md:max-w-2xl md:text-lg md:leading-normal">
            {copy.system.body}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="ivory-panel group rounded-[1.75rem] p-6 transition-colors duration-500 hover:border-primary/40 md:p-8"
            >
              <div className="mb-8 flex items-start justify-between md:mb-10">
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/18 bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mb-3 font-display text-3xl text-foreground">{s.title}</h3>
              <p className="text-foreground/66 leading-7 md:leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
