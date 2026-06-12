import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import dhaka from "@/assets/dhaka-aerial.jpg";
import { EstimateLink, StartAssessmentLink } from "@/components/AssessmentCtas";
import { SEO } from "@/components/SEO";
import { useSiteCopy } from "@/lib/site-copy";

const About = () => {
  const copy = useSiteCopy();

  return (
    <>
      <SEO path="/about" />

      <section className="relative pb-16 pt-40 md:pb-20 md:pt-52">
        <div className="container-tight">
          <p className="eyebrow mb-6 text-primary/80">{copy.about.eyebrow}</p>
          <h1 className="display-text max-w-4xl text-5xl text-balance md:text-7xl">
            {copy.about.headline}
          </h1>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-tight">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-[2rem] border border-border/60">
            <img
              src={dhaka}
              alt="Dhaka skyline at dusk"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-tight grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">{copy.about.thesisEyebrow}</p>
          </div>
          <div className="md:col-span-8 space-y-6 text-muted-foreground">
            <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
              {copy.about.thesisLead}
            </p>
            {copy.about.thesisBody.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/26 py-24 md:py-32">
        <div className="container-tight">
          <p className="eyebrow mb-6 text-primary/80">{copy.about.proofEyebrow}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {copy.about.proofCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="ivory-panel rounded-[1.8rem] p-8"
              >
                <CheckCircle2 className="mb-5 h-5 w-5 text-primary/80" />
                <h2 className="font-display text-2xl tracking-[-0.04em] text-foreground">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-tight grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">{copy.about.partnersEyebrow}</p>
          </div>
          <div className="md:col-span-8 space-y-6 text-muted-foreground">
            <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
              {copy.about.partnersLead}
            </p>
            {copy.about.partnersBody.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8">
                {paragraph}
              </p>
            ))}
            <a
              href="mailto:partners@netso.energy"
              className="inline-flex text-primary transition-colors hover:text-primary-glow"
            >
              partners@netso.energy
            </a>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-tight flex flex-col gap-3 sm:flex-row">
          <StartAssessmentLink source="about-page" />
          <EstimateLink source="about-page" />
        </div>
      </section>
    </>
  );
};

export default About;
