import { motion } from "framer-motion";
import { Wallet, ShieldCheck, TrendingUp } from "lucide-react";
import { useSiteCopy } from "@/lib/site-copy";

export const ValueStack = () => {
  const copy = useSiteCopy();
  const values = [
    { icon: Wallet, ...copy.value.cards[0] },
    { icon: ShieldCheck, ...copy.value.cards[1] },
    { icon: TrendingUp, ...copy.value.cards[2] },
  ];

  return (
    <section className="relative bg-secondary/24 py-20 md:py-44">
      <div className="container-tight">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6 text-primary/80">{copy.value.eyebrow}</p>
          <h2 className="display-text text-4xl text-balance text-foreground md:text-6xl">
            {copy.value.headline}
          </h2>
          <p className="mt-5 max-w-2xl rounded-2xl border border-primary/25 bg-primary/[0.06] px-5 py-4 text-[0.95rem] font-medium leading-6 text-foreground md:text-base md:leading-7">
            {copy.value.modelLine}
          </p>
        </div>

        <dl className="mt-12 divide-y divide-border/70 border-y border-border/70 md:mt-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group grid gap-3 py-7 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.2fr)] sm:items-baseline sm:gap-8 md:py-9"
            >
              <dt className="flex items-center gap-4">
                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                  <v.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Benefit 0{i + 1}
                </span>
              </dt>
              <dd className="font-display text-2xl tracking-[-0.02em] text-foreground md:text-3xl">
                {v.title}
              </dd>
              <dd className="text-[0.95rem] leading-6 text-foreground/66 md:text-base md:leading-relaxed">
                {v.body}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
};
