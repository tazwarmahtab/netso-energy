"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing({ onOpenCalculator }) {
  const container = useRef(null);
  const img = useRef(null);
  const title = useRef(null);
  const subtitle = useRef(null);

  // Bangladesh-specific pricing
  const costPerWatt = 85; // BDT per watt
  const sampleSystemSizes = [3, 5, 10]; // kW
  const electricityRate = 12; // BDT per kWh
  
  // Calculate sample pricing
  const pricingOptions = sampleSystemSizes.map(size => {
    const totalCost = size * 1000 * costPerWatt;
    const monthlyProduction = size * 550 * 4.5 * 0.85 / 1000 * 30; // Same formula as calculator
    const monthlySavings = monthlyProduction * electricityRate;
    const paybackMonths = Math.ceil(totalCost / monthlySavings);
    
    return {
      size: size,
      cost: totalCost,
      monthlySavings: monthlySavings,
      payback: paybackMonths,
      suitableFor: size <= 3 ? "Small Home" : size <= 7 ? "Medium Home" : "Large Home/Office"
    };
  });

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

      // Title/subtitle reveal
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

      // Parallax drift
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
      {/* Pricing Image */}
      <div className="relative w-full max-w-6xl mx-auto h-[450px] md:h-[600px] xl:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
        <Image
          ref={img}
          src="/assets/Pricing.png"
          alt="Netso Pricing"
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
          Pricing
        </h2>

        <p
          ref={subtitle}
          className="mt-6 text-white/75 text-lg md:text-2xl leading-relaxed"
        >
          Whether you choose upfront payment or zero-CAPEX financing, Netso offers
          flexible options that make rooftop solar accessible for every building.
        </p>

        {/* Pricing Options Display */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-white/60 text-sm mb-2">{option.suitableFor}</div>
              <div className="text-white text-2xl font-bold mb-1">{option.size}kW System</div>
              <div className="text-green-400 text-3xl font-bold mb-3">
                ৳{(option.cost / 1000).toFixed(0)}K
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Monthly Savings:</span>
                  <span className="text-green-400 font-medium">
                    ৳{option.monthlySavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Payback Period:</span>
                  <span className="text-white font-medium">
                    {option.payback} months
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Financing Options */}
        <div className="mt-10 bg-white/5 rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="text-white font-semibold text-lg mb-4">Financing Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-white font-medium mb-1">Upfront Payment</div>
              <div className="text-green-400">Best ROI</div>
              <div className="text-white/50 text-xs mt-1">Fastest payback</div>
            </div>
            <div className="text-center">
              <div className="text-white font-medium mb-1">EMI</div>
              <div className="text-blue-400">20% Down</div>
              <div className="text-white/50 text-xs mt-1">5-year term @9%</div>
            </div>
            <div className="text-center">
              <div className="text-white font-medium mb-1">Zero CAPEX</div>
              <div className="text-purple-400">No Down Payment</div>
              <div className="text-white/50 text-xs mt-1">10-year term</div>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenCalculator}
          className="mt-10 px-8 py-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 text-white font-medium text-lg hover:bg-white/30 transition"
        >
          Calculate Your Exact Savings
        </button>
      </div>
    </section>
  );
}
