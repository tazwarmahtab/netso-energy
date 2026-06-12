import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSiteCopy } from "@/lib/site-copy";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface IndustryCardProps {
  title: string;
  body: string;
}

const IndustryCard = ({ card, i, isHighlight }: { card: IndustryCardProps; i: number; isHighlight: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Spotlight gradient coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className={cn(
        "relative group flex flex-col justify-between rounded-none p-8 min-h-[400px] transition-colors duration-500 overflow-hidden border border-black/[0.04]",
        isHighlight 
          ? "bg-primary text-primary-foreground shadow-[0_20px_50px_rgba(200,178,255,0.25)]" 
          : "bg-[#f5f5f5] text-black hover:bg-neutral-100 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)]"
      )}
    >
      {/* Spotlight Radial Background Glow for default cards */}
      {!isHighlight && (
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(200, 178, 255, 0.12), transparent 80%)`,
          }}
        />
      )}

      {/* Spotlight Radial Border Glow for default cards */}
      {!isHighlight && (
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(200, 178, 255, 0.45), transparent 80%)`,
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)"
          }}
        />
      )}

      <div className="relative z-10 flex justify-end">
        <motion.div
          whileHover={{ rotate: 90, scale: 1.15 }}
          transition={{ type: "spring", stiffness: 350, damping: 15 }}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer",
            isHighlight 
              ? "bg-primary-foreground/20 text-primary-foreground" 
              : "bg-black/5 text-black group-hover:bg-primary group-hover:text-primary-foreground"
          )}
        >
          <Plus className="w-4 h-4" />
        </motion.div>
      </div>
      
      <div className="relative z-10 mt-auto pt-12">
        {isHighlight && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-black text-white text-xs font-bold tracking-widest uppercase px-2 py-1 mb-4"
          >
            Overview:
          </motion.div>
        )}
        
        {isHighlight ? (
          <p className="text-lg leading-relaxed font-medium">
            {card.body}
          </p>
        ) : (
          <>
            <h3 className="font-display text-2xl font-bold mb-4 transition-transform duration-300 group-hover:-translate-y-1">{card.title}</h3>
            <div className="w-12 h-12 mb-2 text-black/40 group-hover:text-primary transition-all duration-500 group-hover:scale-105 group-hover:rotate-6">
              {/* Premium icon with glowing path */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const IndustriesGrid = () => {
  const copy = useSiteCopy();

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="container-tight">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="display-lg text-black mb-16"
        >
          {copy.problem.headline}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.problem.cards.map((card, i) => (
            <IndustryCard 
              key={card.title}
              card={card}
              i={i}
              isHighlight={i === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

