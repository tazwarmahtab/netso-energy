import { motion } from "framer-motion";
import dhakaImg from "@/assets/dhaka-aerial.jpg";

export const ProblemSection = () => {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={dhakaImg}
          alt="Aerial view of Dhaka rooftops at dusk"
          className="h-full w-full object-cover opacity-40"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="container-tight">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          The problem
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display-text text-4xl md:text-6xl max-w-4xl text-balance"
        >
          Dhaka has <span className="italic text-primary">millions</span> of rooftops.
          Almost none of them generate value.
        </motion.h2>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
          {[
            { stat: "85%", label: "of urban rooftops in Dhaka are unused or cluttered." },
            { stat: "12+", label: "hours of unreliable grid supply during peak season." },
            { stat: "BDT 7,000+", label: "average monthly bill for a mid-sized household." },
          ].map((s, i) => (
            <motion.div
              key={s.stat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card p-8 md:p-10"
            >
              <p className="display-text text-5xl md:text-6xl text-primary">{s.stat}</p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-xs">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
