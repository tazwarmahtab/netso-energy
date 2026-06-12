"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const container = useRef(null);
  const img = useRef(null);
  const title = useRef(null);
  const steps = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade-in
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

      // Title reveal
      gsap.from(title.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      // Step-by-step reveal (stagger)
      gsap.from(steps.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      // Parallax image
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
      {/* Image */}
      <div className="relative w-full max-w-6xl mx-auto h-[420px] md:h-[580px] xl:h-[680px] rounded-3xl overflow-hidden shadow-2xl">
        <Image
          ref={img}
          src="/assets/Howitworks.png"
          alt="How Netso Works"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 90vw, 1152px"
          priority
        />
      </div>

      {/* Text */}
      <div className="mt-16 text-center max-w-4xl mx-auto px-6">
        <h2
          ref={title}
          className="text-white text-4xl md:text-6xl font-bold drop-shadow-xl"
        >
          How It Works
        </h2>

        <div className="mt-10 grid gap-8 md:gap-12">
          {[
            "We evaluate your rooftop and design a custom solar lounge installation.",
            "Our engineering team installs the structure with precision and safety.",
            "You enjoy a shaded rooftop space that generates clean power every day.",
          ].map((text, i) => (
            <p
              key={i}
              ref={(el) => (steps.current[i] = el)}
              className="text-white/75 text-lg md:text-2xl leading-relaxed"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
