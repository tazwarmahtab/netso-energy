"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RooftopLounge() {
  const container = useRef(null);
  const img = useRef(null);
  const title = useRef(null);
  const subtitle = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade-in
      gsap.from(container.current, {
        opacity: 0,
        y: 120,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      });

      // Text reveal
      gsap.from([title.current, subtitle.current], {
        opacity: 0,
        y: 40,
        duration: 1.3,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      // Parallax on scroll
      gsap.to(img.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
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
      className="relative w-full py-32 md:py-48 overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[650px] xl:h-[750px] rounded-3xl overflow-hidden shadow-2xl">
        <Image
          ref={img}
          src="/assets/Solarlounge.JPEG"
          alt="Rooftop solar lounge"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 90vw, 1152px"
          priority
        />
      </div>

      {/* Text */}
      <div className="mt-14 text-center max-w-3xl mx-auto px-6">
        <h2
          ref={title}
          className="text-white text-4xl md:text-6xl font-bold drop-shadow-xl"
        >
          Transform your rooftop into Bangladesh&apos;s first cinematic solar lounge — a living
          space that generates energy, cools the city, and creates destinations in the sky.
        </h2>

        <p
          ref={subtitle}
          className="mt-6 text-white/80 text-lg md:text-2xl leading-relaxed"
        >
          Not just panels — a beautifully designed shaded space that generates
          power, enhances your lifestyle, and elevates your building&apos;s luxury.
        </p>
      </div>
    </section>
  );
}
