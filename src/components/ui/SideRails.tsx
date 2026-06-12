import React from 'react';

export const SideRails = () => {
  return (
    <>
      {/* Left Rail */}
      <div className="fixed top-0 bottom-0 left-0 w-8 md:w-12 z-[100] pointer-events-none flex items-center justify-center border-r border-border/40 mix-blend-difference hidden sm:flex">
        <div className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.42em] uppercase text-muted-foreground/60 whitespace-nowrap [writing-mode:vertical-rl]">
          NETSO ENERGY // SYSTEM ARCHITECTURE
        </div>
      </div>

      {/* Right Rail */}
      <div className="fixed top-0 bottom-0 right-0 w-8 md:w-12 z-[100] pointer-events-none flex items-center justify-center border-l border-border/40 mix-blend-difference hidden sm:flex">
        <div className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.42em] uppercase text-muted-foreground/60 whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
          23.8103° N, 90.4125° E // DHAKA HQ
        </div>
      </div>
    </>
  );
};
