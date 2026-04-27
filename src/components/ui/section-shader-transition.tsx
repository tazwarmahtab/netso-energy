"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DitheringShader } from "@/components/ui/dithering-shader";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SectionShaderTransitionProps = {
  className?: string;
  darkTop?: boolean;
};

export const SectionShaderTransition = ({
  className,
  darkTop = false,
}: SectionShaderTransitionProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-hidden="true"
      className={cn(
        "relative h-28 overflow-hidden bg-background sm:h-36",
        darkTop && "before:absolute before:inset-x-0 before:top-0 before:h-14 before:bg-gradient-to-b before:from-black/16 before:to-transparent before:content-['']",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/96 to-background" />
      {!prefersReducedMotion ? (
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px -20% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <DitheringShader
            className="absolute inset-0 opacity-70"
            colorBack="#f6efe2"
            colorFront="#d6c3f6"
            shape="simplex"
            type="4x4"
            pxSize={5}
            speed={0.45}
          />
        </motion.div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 h-px bg-border/80" />
    </section>
  );
};
