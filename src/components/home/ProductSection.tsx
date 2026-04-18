import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import productImg from "@/assets/product-pergola.jpg";

export const ProductSection = () => {
  return (
    <section className="relative py-32 md:py-44">
      <div className="container-tight grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60 shadow-deep">
            <img
              src={productImg}
              alt="NETSO solar pergola — architectural close-up"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1600}
              height={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/60 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:flex glass-card px-6 py-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Output</p>
              <p className="font-display text-2xl">5–15 kWp</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-6">The product</p>
          <h2 className="display-text text-4xl md:text-5xl lg:text-6xl text-balance">
            The Solar Pergola.<br />
            <span className="italic text-primary">Architecture that earns.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Engineered for Bangladesh's climate and skyline. A modular steel canopy
            with integrated photovoltaic panels that shades, shelters, and generates —
            all at once.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px bg-border/60 border border-border/60 rounded-xl overflow-hidden">
            {[
              ["Spans", "Up to 8m"],
              ["Wind rated", "180 km/h"],
              ["Warranty", "25 years"],
              ["Install", "5–10 days"],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</p>
                <p className="mt-2 font-display text-2xl">{v}</p>
              </div>
            ))}
          </div>

          <Link
            to="/products"
            className="mt-10 group inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
          >
            Explore the pergola
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
