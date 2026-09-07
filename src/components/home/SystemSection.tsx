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

        <div className="relative mt-12 md:mt-20">
          <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px md:block">
            <div className="mx-auto h-full w-full max-w-5xl bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
          </div>
          <ol className="relative grid gap-6 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-[1.5rem] border border-transparent p-1 md:p-2"
              >
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                  <span className="relative z-10 inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-foreground text-background shadow-[0_10px_28px_rgba(27,18,6,0.22)] transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground md:mb-6">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span aria-hidden="true" className="hidden font-mono text-xs uppercase tracking-[0.24em] text-primary/70 md:block">
                    Phase 0{i + 1}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-border/60 md:hidden" />
                </div>
                <h3 className="mt-4 font-display text-2xl tracking-[-0.02em] text-foreground md:mt-3 md:text-3xl">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-6 text-foreground/66 md:leading-relaxed">{s.body}</p>
                {s.detail ? (
                  <p className="mt-3 border-l-2 border-primary/40 pl-3 text-xs leading-5 text-foreground/58">
                    {s.detail}
                  </p>
                ) : null}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
