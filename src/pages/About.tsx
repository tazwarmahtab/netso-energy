import { motion } from "framer-motion";
import dhaka from "@/assets/dhaka-aerial.jpg";

const About = () => {
  return (
    <>
      <section className="pt-40 pb-20 md:pt-52 md:pb-28 relative">
        <div className="container-tight">
          <p className="eyebrow mb-6">About NETSO</p>
          <h1 className="display-text text-5xl md:text-7xl max-w-4xl text-balance">
            Building Bangladesh's <span className="italic text-primary">distributed</span>{" "}
            energy backbone — one rooftop at a time.
          </h1>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-tight">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border/60">
            <img src={dhaka} alt="Dhaka skyline at dusk" className="h-full w-full object-cover" loading="lazy" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-tight grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Our thesis</p>
          </div>
          <div className="md:col-span-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p className="text-foreground text-2xl md:text-3xl font-display leading-snug">
              Bangladesh doesn't have a land problem. It has a rooftop opportunity.
            </p>
            <p>
              Every flat concrete roof in Dhaka is, in effect, a piece of unused energy
              infrastructure. NETSO exists to activate that infrastructure — turning
              private rooftops into a distributed, citizen-owned power grid.
            </p>
            <p>
              We're not a panel installer. We're a platform: design, financing,
              installation, and lifetime monitoring, built around a single hardware
              product — the Solar Pergola — that makes the upgrade beautiful,
              not industrial.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary/30">
        <div className="container-tight">
          <p className="eyebrow mb-6">By the numbers</p>
          <div className="grid md:grid-cols-4 gap-px bg-border/60 border border-border/60 rounded-2xl overflow-hidden">
            {[
              ["120+", "Rooftops activated"],
              ["1.4 MW", "Capacity installed"],
              ["6,200 t", "CO₂ offset / year"],
              ["BDT 38M", "Annual savings created"],
            ].map(([n, l], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-card p-8"
              >
                <p className="display-text text-4xl md:text-5xl text-primary">{n}</p>
                <p className="mt-3 text-sm text-muted-foreground">{l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-tight grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">For partners</p>
          </div>
          <div className="md:col-span-8 space-y-6 text-muted-foreground">
            <p className="text-foreground text-xl font-display">
              Developers, investors and institutions: we're building the rooftop layer
              of Bangladesh's energy transition.
            </p>
            <p>
              We work with property developers integrating NETSO at design stage,
              with financiers building rooftop-as-a-service portfolios, and with
              institutions deploying at scale across staff housing and commercial assets.
            </p>
            <p>
              <a href="mailto:partners@netso.energy" className="text-primary hover:text-primary-glow transition-colors">
                partners@netso.energy →
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
