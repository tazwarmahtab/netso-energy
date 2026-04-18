import { motion } from "framer-motion";
import { Wallet, ShieldCheck, TrendingUp, Leaf } from "lucide-react";

const values = [
  {
    icon: Wallet,
    title: "Lower bills",
    body: "Self-consume up to 70% of your generation. Typical payback in 4–6 years.",
  },
  {
    icon: ShieldCheck,
    title: "Resilience",
    body: "Optional battery backup keeps essentials running through outages.",
  },
  {
    icon: TrendingUp,
    title: "Property value",
    body: "A solar-equipped roof commands 5–8% higher resale value in urban Dhaka.",
  },
  {
    icon: Leaf,
    title: "Cleaner air",
    body: "Each rooftop offsets ~6 tonnes of CO₂ per year — measurable, local impact.",
  },
];

export const ValueStack = () => {
  return (
    <section className="relative py-32 md:py-44 bg-secondary/30">
      <div className="container-tight">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">The value stack</p>
          <h2 className="display-text text-4xl md:text-6xl text-balance">
            Four returns. <span className="italic text-primary">One install.</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-8 rounded-2xl border border-border/60 bg-card hover:bg-card/80 transition-colors"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 transition-all duration-500 group-hover:bg-gradient-sun group-hover:text-primary-foreground">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-2xl mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
