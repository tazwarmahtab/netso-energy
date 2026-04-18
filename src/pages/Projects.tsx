import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import t3 from "@/assets/transform-3-solar.jpg";
import t4 from "@/assets/transform-4-lifestyle.jpg";
import hero from "@/assets/hero-rooftop.jpg";

const projects = [
  { img: p1, title: "Gulshan Residence", location: "Gulshan, Dhaka", system: "Solar Pergola", size: "8.4 kWp", year: "2024" },
  { img: p2, title: "Mirpur Commercial Tower", location: "Mirpur, Dhaka", system: "Rooftop Array", size: "42 kWp", year: "2024" },
  { img: p3, title: "Dhanmondi Apartment", location: "Dhanmondi, Dhaka", system: "Solar Pergola", size: "12 kWp", year: "2023" },
  { img: t3, title: "Banani Townhouse", location: "Banani, Dhaka", system: "Solar Pergola", size: "6 kWp", year: "2023" },
  { img: t4, title: "Uttara Family Home", location: "Uttara, Dhaka", system: "Pergola + Battery", size: "10 kWp · 15 kWh", year: "2024" },
  { img: hero, title: "Old Dhaka Heritage", location: "Old Dhaka", system: "Solar Pergola", size: "7 kWp", year: "2024" },
];

const Projects = () => {
  return (
    <>
      <section className="pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="container-tight">
          <p className="eyebrow mb-6">Projects</p>
          <h1 className="display-text text-5xl md:text-7xl max-w-4xl text-balance">
            Real rooftops. Real <span className="italic text-primary">returns</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A growing portfolio of installations across Dhaka — homes, apartments,
            and commercial buildings, all earning back from their roofs.
          </p>
        </div>
      </section>

      <section className="pb-32 md:pb-44">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-xl overflow-hidden border border-border/60 bg-card hover:border-primary/40 transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105"
                    loading="lazy"
                    width={1200}
                    height={896}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl">{p.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-foreground/80">{p.system}</span>
                    <span className="text-primary font-medium">{p.size}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              to="/feasibility"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground shadow-sun transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
            >
              Add your rooftop
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
