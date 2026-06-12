import React from 'react';
import { motion } from 'framer-motion';

export const WireTicker = () => {
  const metrics = [
    "LIVE: 42kW GENERATING IN GULSHAN",
    "12kW IN BANANI",
    "80kW IN UTTARA",
    "SYSTEM NOMINAL",
    "GRID SYNC ACTIVE",
    "BATTERY RESERVE 98%"
  ];

  // Duplicate the array to create a seamless infinite loop
  const tickerItems = [...metrics, ...metrics, ...metrics];

  return (
    <div className="relative overflow-hidden border-y border-border/40 bg-surface/30 backdrop-blur-md py-4">
      <div className="flex items-center gap-12">
        {/* Fixed left marker */}
        <div className="flex items-center gap-4 pl-8 border-r border-border/40 pr-8 min-w-[220px]">
          <div className="h-5 w-5 rounded-full border border-border flex items-center justify-center shrink-0">
            <div className="h-1.5 w-1.5 rounded-full bg-primary pulse-glow" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-foreground">
              NETSO.OS
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
              Global Status
            </span>
          </div>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-16 whitespace-nowrap animate-marquee">
            {tickerItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-primary text-lg leading-none">•</span>
                <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                  {item}
                </span>
              </div>
            ))}
          </div>
          {/* Gradient masks for smooth fading at edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
