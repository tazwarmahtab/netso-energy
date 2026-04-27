import { motion } from "framer-motion";
import productImg from "@/assets/product-pergola.jpg";

const specs = [
  { label: "Structure", value: "Site-reviewed frame" },
  { label: "Module Type", value: "Integrated PV canopy" },
  { label: "Engineering", value: "Project-specific brief" },
  { label: "Finish", value: "Weather-conscious detailing" },
  { label: "Lighting", value: "Optional integrated lighting" },
  { label: "Coverage", value: "Defined by scope" },
];

export const FeatureSpotlight = () => {
  return (
    <section className="py-32 md:py-44 overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={productImg} 
                alt="Solar Pergola Details" 
                className="h-full w-full object-cover scale-110 transition-transform duration-700 hover:scale-100"
                style={{ transitionDuration: "3000ms" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
              
              {/* Floating detail tag */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 glass-card p-6 border-white/20"
              >
                <p className="mb-1 text-[10px] uppercase tracking-widest text-white/60">Material</p>
                <p className="text-lg font-medium text-white">Aircraft Grade Finish</p>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl -z-10" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          <div className="space-y-12">
            <div>
              <p className="mb-6 text-solar eyebrow">Spotlight · Engineering</p>
              <h2 className="display-md mb-8">Built for the long term.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Every NETSO pergola is treated as an architectural layer, not an afterthought. The aim is to align shade, shelter, and generation with the realities of the roof rather than forcing a generic hardware kit onto the building.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border-b border-border/60 pb-4"
                >
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{s.label}</p>
                  <p className="font-medium text-foreground">{s.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
