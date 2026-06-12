"use client";
import { useEffect, useRef } from "react";
import { ReactLenis } from '@studio-freight/react-lenis';
import Preloader from "./components/Preloader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    
    // Sync Lenis & GSAP
    const update = (time) => {
      lenis?.raf(time);
      ScrollTrigger.update();
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <Preloader />
        <ReactLenis ref={lenisRef} root options={{
          lerp: 0.08,
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.5,
        }}>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
