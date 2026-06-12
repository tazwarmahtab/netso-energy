import { motion, useScroll, useTransform } from "framer-motion";
import { useSiteCopy } from "@/lib/site-copy";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform as useFramerTransform, animate } from "framer-motion";

const AnimatedCounter = ({ valueText }: { valueText: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  // Parse numeric part and suffix (e.g. "45%" -> { value: 45, suffix: "%" })
  const numericPart = parseFloat(valueText) || 0;
  const suffix = valueText.replace(/[0-9.]/g, "");

  const motionVal = useMotionValue(0);
  const rounded = useFramerTransform(motionVal, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, numericPart, {
        duration: 2.0,
        ease: [0.16, 1, 0.3, 1]
      });
      return controls.stop;
    }
  }, [inView, motionVal, numericPart]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toLocaleString() + suffix;
      }
    });
  }, [rounded, suffix]);

  return <span ref={ref} className="tabular-nums font-display font-medium">0{suffix}</span>;
};

export const StatsShowcase = () => {
  const copy = useSiteCopy();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.25]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const stats = [
    { value: "45%", label: "Carbon Reduction" },
    { value: "200+", label: "Global Projects" },
    { value: "500M", label: "Saved in Revenue" },
    { value: "25%", label: "Average ROI" },
  ];

  // Map circle indices to standard Tailwind size percentage classes to eliminate inline styling lints
  const circleSizeClasses = [
    "w-1/5 h-1/5",
    "w-2/5 h-2/5",
    "w-3/5 h-3/5",
    "w-4/5 h-4/5",
    "w-full h-full"
  ];

  return (
    <section ref={containerRef} className="bg-white py-4 md:py-8 overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left Side: Visual / Title */}
          <div className="relative overflow-hidden bg-primary min-h-[400px] lg:min-h-[600px] flex items-center justify-center p-12">
            {/* Concentric circles scroll parallax background effect */}
            <motion.div 
              style={{ scale, rotate }}
              className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none"
            >
              {circleSizeClasses.map((sizeClass, idx) => (
                <div 
                  key={idx}
                  className={`absolute rounded-full border border-primary-foreground aspect-square ${sizeClass}`}
                />
              ))}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 display-md text-primary-foreground flex items-center gap-4"
            >
              Our Numbers
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.h2>
          </div>

          {/* Right Side: Stats */}
          <div className="bg-[#111413] text-white p-12 lg:p-24 flex items-center">
            <div className="grid grid-cols-2 gap-x-8 gap-y-16 w-full">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-2"
                >
                  <div className="display-md text-primary">
                    <AnimatedCounter valueText={stat.value} />
                  </div>
                  <div className="text-sm tracking-wide text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

