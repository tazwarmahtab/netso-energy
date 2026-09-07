import { motion } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteCopy } from "@/lib/site-copy";

export const HomeFaqSection = () => {
  const copy = useSiteCopy();

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-36">
      <div className="container-tight">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-6 text-primary/80">{copy.faq.eyebrow}</p>
            <h2 className="display-text text-4xl text-balance text-foreground md:text-5xl">
              {copy.faq.headline}
            </h2>
            <p className="mt-4 max-w-md text-base leading-8 text-foreground/72">
              {copy.faq.body}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Accordion type="single" collapsible className="w-full divide-y divide-border/70 border-y border-border/70">
              {copy.faq.items.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`} className="border-b-0 px-1">
                  <AccordionTrigger className="py-6 text-left font-display text-lg tracking-[-0.01em] text-foreground hover:no-underline hover:text-primary md:text-xl">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[0.95rem] leading-7 text-foreground/70">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
