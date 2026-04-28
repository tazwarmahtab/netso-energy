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
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="ivory-panel group relative rounded-[1.6rem] p-6 transition-colors md:p-8"
            >
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground md:mb-6">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mb-2 font-display text-2xl text-foreground">{v.title}</h3>
              <p className="text-sm leading-7 text-foreground/66 md:leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
