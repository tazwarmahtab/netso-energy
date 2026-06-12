"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Navbar({ onOpenCalculator }) {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 2,
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative w-24 h-12 md:w-32 md:h-16">
            <img
              src="/assets/logo.png"
              alt="Netso Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* CTA Button */}
          <button
            onClick={onOpenCalculator}
            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
          >
            Get Quote
          </button>
        </div>
      </div>
    </nav>
  );
}
