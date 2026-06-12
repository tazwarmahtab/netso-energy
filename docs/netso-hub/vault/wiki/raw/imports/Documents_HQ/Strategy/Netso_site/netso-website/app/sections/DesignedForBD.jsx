"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DesignedForBD() {
  const container = useRef(null);
  const img = useRef(null);
  const title = useRef(null);
  const subtitle = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.from(container.current, {
        opacity: 0,
        y: 100,
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

      // Parallax
      gsap.to(img.current, {
        yPercent: -12,
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
      {/* Image */}
      <div className="relative w-full max-w-6xl mx-auto h-[450px] md:h-[620px] xl:h-[720px] rounded-3xl overflow-hidden shadow-2xl">
        <Image
          ref={img}
          src="/assets/Designedforbangladesh.png"
          alt="Designed for Bangladesh"
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
          Designed for Bangladesh
        </h2>

        <p
          ref={subtitle}
          className="mt-6 text-white/75 text-lg md:text-2xl leading-relaxed"
        >
          Engineered specifically for Dhaka&apos;s climate, rooftops, and lifestyle.
          Bangladesh&apos;s climate and architecture demand custom solar design. Netso&apos;s rooftop lounges
          maximize sun exposure, reduce heat, and elevate the lifestyle of every building we touch.
        </p>
      </div>
    </section>
  );
}
