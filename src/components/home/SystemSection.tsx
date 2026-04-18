import { motion } from "framer-motion";
import { Sun, Cpu, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Sun,
    title: "Capture",
    body: "Premium photovoltaic panels integrated into architectural pergolas convert sunlight into clean electricity — silently, all day.",
  },
  {
    icon: Cpu,
    title: "Optimize",
    body: "Smart inverters and battery options balance generation with consumption, prioritising self-use and grid resilience.",
  },
  {
    icon: TrendingUp,
    title: "Compound",
    body: "Lower bills, backup during outages, and meaningful uplift in property value — your rooftop starts paying you back.",
  },
];

export const SystemSection = () => {
  return (
    <section className="relative py-32 md:py-44">
      <div className="container-tight">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">The system</p>
          <h2 className="display-text text-4xl md:text-6xl text-balance">
            Three layers. One quietly powerful asset.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Every NETSO installation works as a single, integrated system — engineered
            for the realities of Bangladesh's grid, weather, and architecture.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card p-8 group hover:border-primary/40 transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-10">
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="font-display text-3xl mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
