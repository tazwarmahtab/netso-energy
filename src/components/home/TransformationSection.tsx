import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import t1 from "@/assets/transform-1-empty.jpg";
import t2 from "@/assets/transform-2-structure.jpg";
import t3 from "@/assets/transform-3-solar.jpg";
import t4 from "@/assets/transform-4-lifestyle.jpg";

const stages = [
  { img: t1, label: "Empty", caption: "An average Dhaka rooftop. Concrete, water tanks, wires." },
  { img: t2, label: "Structure", caption: "A clean steel pergola — engineered, low-profile, resilient." },
  { img: t3, label: "Solar", caption: "PV panels become the canopy. Power begins flowing." },
  { img: t4, label: "Lifestyle", caption: "A new floor of your home. Cooler, calmer, productive." },
];

export const TransformationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-44 bg-secondary/30 overflow-hidden">
      <div className="container-tight">
        <div className="max-w-3xl mb-20">
          <p className="eyebrow mb-6">The transformation</p>
          <h2 className="display-text text-4xl md:text-6xl text-balance">
            From <span className="italic text-muted-foreground">overlooked</span> to{" "}
            <span className="italic text-primary">essential</span>.
          </h2>
        </div>

        <motion.div style={{ x }} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stages.map((s, i) => (
            <motion.figure
              key={s.label}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/60 shadow-deep">
                <img
                  src={s.img}
                  alt={`${s.label} stage of rooftop transformation`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
                  loading="lazy"
                  width={1280}
                  height={896}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  0{i + 1}
                </div>
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-display text-2xl md:text-3xl text-foreground">{s.label}</p>
                </div>
              </div>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                {s.caption}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
