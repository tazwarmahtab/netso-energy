"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA({ onOpenCalculator }) {
  const container = useRef(null);

  useEffect(() => {
    gsap.from(container.current, {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <section ref={container} className="py-32 text-center">
      <h2 className="text-white text-5xl font-bold drop-shadow-xl">
        Ready to Transform Your Rooftop?
      </h2>
      <p className="text-white/70 mt-4 text-xl max-w-2xl mx-auto">
        Book a free roof assessment — and see your building differently.
      </p>

      <button 
        onClick={onOpenCalculator}
        className="mt-10 px-8 py-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 text-white font-medium text-lg hover:bg-white/30 transition"
      >
        Book Roof Assessment
      </button>
    </section>
  );
}
