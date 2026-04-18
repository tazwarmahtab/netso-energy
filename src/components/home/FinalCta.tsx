import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const FinalCta = () => {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-radial-glow opacity-60" />
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-border/60 bg-gradient-surface p-10 md:p-20 text-center overflow-hidden"
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-gradient-sun opacity-20 blur-3xl animate-sun-pulse" />

          <p className="eyebrow mb-6">Start where you are</p>
          <h2 className="display-text text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto text-balance">
            Your rooftop is already there.<br />
            <span className="italic text-primary">Let it work for you.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            A 60-second feasibility check tells you what your rooftop can generate,
            save, and earn.
          </p>

          <Link
            to="/feasibility"
            className="mt-10 group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-sun transition-all duration-300 ease-cinematic hover:scale-[1.03] hover:brightness-110"
          >
            Check rooftop potential
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
