"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const overlay = useRef(null);
  const logo = useRef(null);

  useEffect(() => {
    // Animate logo
    gsap.from(logo.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3,
    });

    // Fade out overlay
    gsap.to(overlay.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: 1.5,
      onComplete: () => {
        overlay.current.style.display = "none";
      },
    });
  }, []);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div ref={logo} className="relative">
        <img
          src="/assets/logo.png"
          alt="Netso Logo"
          className="w-32 h-32 md:w-48 md:h-48 object-contain"
        />
      </div>
    </div>
  );
}
