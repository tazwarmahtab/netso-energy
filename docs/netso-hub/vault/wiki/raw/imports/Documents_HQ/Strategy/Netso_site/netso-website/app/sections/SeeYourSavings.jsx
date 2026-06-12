"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SeeYourSavings({ onOpenCalculator }) {
  const container = useRef(null);
  const img = useRef(null);
  const title = useRef(null);
  const subtitle = useRef(null);
  
  // Sample calculations for display
  const sampleSystemSize = 5; // 5kW system
  const electricityRate = 12; // BDT per kWh
  const sunlightHours = 4.5;
  const systemEfficiency = 0.85;
  const panelWattage = 550;
  
  const dailyProduction = sampleSystemSize * panelWattage * sunlightHours * systemEfficiency / 1000;
  const monthlyProduction = dailyProduction * 30;
  const monthlySavings = monthlyProduction * electricityRate;
  const yearlySavings = monthlySavings * 12;
  const twentyYearSavings = yearlySavings * 20;

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

      // Text reveal
      gsap.from([title.current, subtitle.current], {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      // Parallax effect
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
      <div className="relative w-full max-w-6xl mx-auto h-[450px] md:h-[600px] xl:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
        <Image
          ref={img}
          src="/assets/Savings.png"
          alt="See Your Savings"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 90vw, 1152px"
          priority
        />
      </div>

      {/* Text with Live Calculations */}
      <div className="mt-16 text-center max-w-4xl mx-auto px-6">
        <h2
          ref={title}
          className="text-white text-4xl md:text-6xl font-bold drop-shadow-xl"
        >
          See Your Savings
        </h2>

        <p
          ref={subtitle}
          className="mt-6 text-white/75 text-lg md:text-2xl leading-relaxed"
        >
          Track your monthly, yearly, and long-term energy savings instantly.
          Netso helps you understand your return on investment clearly — no
          guesswork, just numbers you can trust.
        </p>

        {/* Live Savings Display */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="text-white/60 text-sm mb-2">Monthly Savings</div>
            <div className="text-green-400 text-3xl font-bold">
              ৳{monthlySavings.toLocaleString()}
            </div>
            <div className="text-white/50 text-xs mt-1">
              {monthlyProduction.toFixed(0)} kWh/month
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="text-white/60 text-sm mb-2">Yearly Savings</div>
            <div className="text-green-400 text-3xl font-bold">
              ৳{yearlySavings.toLocaleString()}
            </div>
            <div className="text-white/50 text-xs mt-1">
              Based on {sampleSystemSize}kW system
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="text-white/60 text-sm mb-2">20-Year Total</div>
            <div className="text-green-400 text-3xl font-bold">
              ৳{(twentyYearSavings / 1000).toFixed(0)}K
            </div>
            <div className="text-white/50 text-xs mt-1">
              Lifetime savings estimate
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onOpenCalculator}
          className="mt-10 px-8 py-4 rounded-full bg-green-500/20 backdrop-blur-xl border border-green-500/40 text-white font-medium text-lg hover:bg-green-500/30 transition"
        >
          Calculate Your Exact Savings
        </button>
      </div>
    </section>
  );
}
