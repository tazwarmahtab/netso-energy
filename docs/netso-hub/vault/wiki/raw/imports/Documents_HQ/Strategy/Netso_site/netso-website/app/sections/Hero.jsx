"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenCalculator }) {
  const container = useRef(null);
  const bg = useRef(null);
  const title = useRef(null);
  const subtitle = useRef(null);
  const cta = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Image Entrance
      gsap.fromTo(
        bg.current,
        { scale: 1.25, opacity: 0, y: 80 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 2.2,
          ease: "power3.out",
        }
      );

      // Title + Subtitle animation
      gsap.from([title.current, subtitle.current], {
        opacity: 0,
        y: 40,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.18,
        delay: 0.4,
      });

      // CTA Button
      gsap.from(cta.current, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power2.out",
        delay: 1.2,
      });

      // Parallax on scroll
      gsap.to(bg.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          ref={bg}
          src="/assets/hero-bg.jpg"
          alt="Netso Hero"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 text-center px-6 max-w-3xl">
        <h1
          ref={title}
          className="text-white font-bold text-5xl md:text-7xl drop-shadow-xl"
        >
          Transform Your Rooftop Into Power
        </h1>

        <p
          ref={subtitle}
          className="mt-4 text-white/80 text-lg md:text-2xl max-w-2xl mx-auto drop-shadow-sm"
        >
          The first cinematic rooftop solar solution designed for Bangladesh.
        </p>

        <button
          ref={cta}
          onClick={onOpenCalculator}
          className="mt-8 px-8 py-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 text-white font-medium text-lg hover:bg-white/30 transition"
        >
          Book Free Roof Assessment
        </button>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 z-10"></div>
    </section>
  );
}
