import { motion } from "framer-motion";
import { FileText, Search, Hammer, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: FileText,
    title: "Submit",
    body: "Share your rooftop details in 60 seconds. We use Bangladesh-specific solar irradiance data and your bill to model output.",
    duration: "1 min",
  },
  {
    icon: Search,
    title: "Analyze",
    body: "Our team produces a feasibility report: generation forecast, system size, savings model, and a fixed-price quote.",
    duration: "3–5 days",
  },
  {
    icon: Hammer,
    title: "Install",
    body: "Certified engineers install the pergola structure, panels, inverters, and (optionally) battery — minimal disruption.",
    duration: "5–10 days",
  },
  {
    icon: Zap,
    title: "Activate",
    body: "We commission the system, connect to net metering where available, and hand over the NETSO monitoring app.",
    duration: "1 day",
  },
];

const HowItWorks = () => {
  return (
    <>
      <section className="pt-40 pb-20 md:pt-52 md:pb-28 relative">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-50" />
        <div className="container-tight">
          <p className="eyebrow mb-6">How it works</p>
          <h1 className="display-text text-5xl md:text-7xl max-w-4xl text-balance">
            From rooftop to <span className="italic text-primary">running</span>{" "}
            in under three weeks.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A linear, transparent process. No hidden fees, no guesswork — just
            engineering and clear timelines.
          </p>
        </div>
      </section>

      <section className="pb-32 md:pb-44">
        <div className="container-tight">
          <div className="relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid md:grid-cols-4 gap-10 md:gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="relative z-10 mx-auto md:mx-0 inline-flex h-24 w-24 items-center justify-center rounded-full bg-card border border-border shadow-soft">
                    <s.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mt-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                      <h3 className="font-display text-3xl">{s.title}</h3>
                    </div>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{s.body}</p>
                    <p className="mt-4 font-mono text-xs text-primary uppercase tracking-[0.2em]">
                      {s.duration}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center">
            <Link
              to="/feasibility"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-sun transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
            >
              Start with a feasibility check
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
