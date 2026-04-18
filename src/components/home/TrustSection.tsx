import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

const partners = ["Grameen Solar", "BSREA", "BRAC", "IDCOL", "Bangladesh PV", "Square Group"];

const featured = [
  { img: p1, title: "Gulshan Residence", spec: "Pergola · 8.4 kWp" },
  { img: p2, title: "Mirpur Commercial", spec: "Rooftop array · 42 kWp" },
  { img: p3, title: "Dhanmondi Apartment", spec: "Pergola · 12 kWp" },
];

export const TrustSection = () => {
  return (
    <section className="relative py-32 md:py-44">
      <div className="container-tight">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-6">Trusted on rooftops across Dhaka</p>
            <h2 className="display-text text-4xl md:text-5xl text-balance">
              Quietly building a city that powers itself.
            </h2>
          </div>
          <Link to="/projects" className="text-sm text-primary hover:text-primary-glow transition-colors">
            View all projects →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border/60">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
                  loading="lazy"
                  width={1200}
                  height={896}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-display text-2xl">{p.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{p.spec}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee partners */}
        <div className="mt-24 relative overflow-hidden border-y border-border/60 py-8">
          <div className="flex animate-marquee gap-16 whitespace-nowrap">
            {[...partners, ...partners].map((name, i) => (
              <span key={i} className="font-display text-2xl md:text-3xl text-muted-foreground/50">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
