import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import productImg from "@/assets/product-pergola.jpg";
import t3 from "@/assets/transform-3-solar.jpg";
import t4 from "@/assets/transform-4-lifestyle.jpg";

const features = [
  ["Modular spans", "Configurable from 3m to 8m to fit any rooftop geometry."],
  ["Integrated PV", "Tier-1 monocrystalline panels become the canopy itself."],
  ["Wind & monsoon rated", "Engineered for 180 km/h gusts and Bangladesh monsoons."],
  ["Smart inverter", "Hybrid inverter with grid-tie and optional battery support."],
  ["Underlight system", "Warm LED strip lighting integrated into the frame."],
  ["Monitoring app", "Real-time generation, savings, and CO₂ data on your phone."],
];

const Products = () => {
  return (
    <>
      <section className="pt-40 pb-12 md:pt-52 md:pb-20">
        <div className="container-tight">
          <p className="eyebrow mb-6">Product · Solar Pergola</p>
          <h1 className="display-text text-5xl md:text-7xl max-w-4xl text-balance">
            One product.<br />
            <span className="italic text-primary">Three jobs.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Shade, shelter, and generation — engineered into a single, beautiful
            architectural object designed for Bangladesh rooftops.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border/60 shadow-deep"
          >
            <img
              src={productImg}
              alt="NETSO Solar Pergola product detail"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1600}
              height={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container-tight grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-6">Specifications</p>
            <h2 className="display-text text-4xl md:text-5xl text-balance">
              Built like infrastructure.<br />Lives like architecture.
            </h2>
          </div>
          <div className="grid gap-px bg-border/60 border border-border/60 rounded-xl overflow-hidden">
            {[
              ["Panel output", "5–15 kWp standard"],
              ["Frame material", "Powder-coated steel"],
              ["Roof load", "Distributed, no penetration option"],
              ["Inverter", "Hybrid, IP65"],
              ["Battery (optional)", "5–20 kWh LFP"],
              ["Warranty", "25 years on panels · 10 on structure"],
            ].map(([k, v]) => (
              <div key={k} className="bg-card p-5 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{k}</span>
                <span className="text-sm font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="container-tight">
          <h2 className="display-text text-4xl md:text-5xl mb-16 max-w-2xl text-balance">
            What's included.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(([title, body], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="p-6 rounded-xl border border-border/60 bg-card"
              >
                <Check className="h-5 w-5 text-primary mb-4" />
                <h3 className="font-display text-2xl mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60">
            <img src={t3} alt="Pergola during day" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60">
            <img src={t4} alt="Pergola at night, lifestyle scene" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="py-28 text-center">
        <div className="container-tight">
          <h2 className="display-text text-4xl md:text-5xl text-balance mb-8">
            Ready to model yours?
          </h2>
          <Link
            to="/feasibility"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-sun transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
          >
            Check rooftop potential
          </Link>
        </div>
      </section>
    </>
  );
};

export default Products;
