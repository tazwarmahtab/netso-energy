"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MissionScroll() {
  const container = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = track.current.scrollWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(track.current, {
        x: () => -(totalWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => "+=" + (totalWidth - viewportWidth),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Horizontal Track */}
      <div ref={track} className="flex h-full">
        <div className="relative h-full w-screen flex-shrink-0">
          <Image
            src="/assets/MissionscrollA.png"
            alt="Netso Mission A"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative h-full w-screen flex-shrink-0">
          <Image
            src="/assets/MissionscrollB.png"
            alt="Netso Mission B"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative h-full w-screen flex-shrink-0">
          <Image
            src="/assets/MissionscrollC.png"
            alt="Netso Mission C"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
