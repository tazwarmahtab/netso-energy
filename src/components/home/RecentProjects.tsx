import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import { useSiteCopy } from "@/lib/site-copy";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS = [p1, p2, p3];

export const RecentProjects = () => {
  const copy = useSiteCopy();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      // Scroll by card width + gap (600px card + 16px gap = 616px)
      scrollContainerRef.current.scrollBy({ left: -616, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 616, behavior: "smooth" });
    }
  };
  
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-tight">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="display-lg text-black"
          >
            Recent Projects
          </motion.h2>
          
          <div className="flex gap-4 mt-6 sm:mt-0">
            <motion.button 
              onClick={handleScrollLeft}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Previous" 
              aria-label="Previous" 
              className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-black cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button 
              onClick={handleScrollRight}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Next" 
              aria-label="Next" 
              className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-black cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-8 scroll-smooth"
      >
        <div className="flex min-w-max gap-4 pb-8 pt-4">
          {[...copy.trust.cards, ...copy.trust.cards].map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative w-[320px] md:w-[600px] flex-none snap-start overflow-hidden rounded-[1rem] bg-black aspect-[4/3] md:aspect-[16/9] cursor-pointer border border-black/[0.03]"
            >
              <img
                src={PROJECTS[i % PROJECTS.length]}
                alt={`${p.title} ${p.location}`}
                loading="lazy"
                className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between z-10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2 transition-transform duration-300 group-hover:-translate-y-1">{p.title}</h3>
                  <p className="text-white/70 font-mono text-sm uppercase tracking-widest">{p.location}</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full transition-colors text-sm font-semibold cursor-pointer"
                >
                  View Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="container-tight mt-12 flex justify-center">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 rounded-full bg-[#111413] px-6 py-3 text-white font-semibold text-sm transition-all hover:bg-black cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          View All
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-1">
            <ArrowRight className="h-3 w-3" />
          </div>
        </motion.button>
      </div>
    </section>
  );
};

