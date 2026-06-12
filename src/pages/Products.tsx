import { motion } from "framer-motion";

import productImg from "@/assets/product-pergola.jpg";
import t3 from "@/assets/transform-3-solar.jpg";
import t4 from "@/assets/custom/transform-5-lifestyle-optimized.jpg";
import { EstimateLink, StartAssessmentLink } from "@/components/AssessmentCtas";
import { SEO } from "@/components/SEO";
import { useSiteCopy } from "@/lib/site-copy";

const Products = () => {
  const copy = useSiteCopy();

  return (
    <>
      <SEO path="/products" />

      <section className="pb-16 pt-40 md:pb-20 md:pt-52" id="solar-canopy-system">
        <div className="container-tight">
          <p className="eyebrow mb-6 text-primary/80">{copy.products.eyebrow}</p>
          <h1 className="display-xl max-w-5xl text-balance">{copy.products.headline}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {copy.products.body}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-tight grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60">
            <img
              src={productImg}
              alt="NETSO rooftop canopy system"
              width={1600}
              height={1200}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="ivory-panel rounded-[2rem] p-8 md:p-10">
            <p className="eyebrow mb-4 text-primary/80">{copy.products.systemHeadline}</p>
            <p className="text-lg leading-8 text-muted-foreground">{copy.products.systemBody}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <StartAssessmentLink source="products-page-hero" />
              <EstimateLink source="products-page-hero" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/26 py-24 md:py-32" id="review-factors">
        <div className="container-tight">
          <h2 className="display-text max-w-3xl text-4xl text-balance md:text-5xl">
            {copy.products.includedTitle}
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {copy.products.included.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="ivory-panel rounded-[1.7rem] p-8"
              >
                <h3 className="font-display text-2xl tracking-[-0.04em] text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-tight grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/60">
            <img
              src={t3}
              alt="Daytime rooftop solar canopy"
              width={800}
              height={1000}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/60">
            <img
              src={t4}
              alt="Lifestyle rooftop scene under a solar canopy"
              width={800}
              height={1000}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="pb-32 text-center" id="start-chat">
        <div className="container-tight">
          <h2 className="display-text text-4xl text-balance md:text-5xl">
            {copy.products.ctaHeadline}
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StartAssessmentLink source="products-page" />
            <EstimateLink source="products-page" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
