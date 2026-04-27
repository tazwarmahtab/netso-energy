import { lazy } from "react";

import { SEO } from "@/components/SEO";
import { Hero } from "@/components/home/Hero";
import { ConversionBand } from "@/components/home/ConversionBand";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SystemSection } from "@/components/home/SystemSection";
import { ValueStack } from "@/components/home/ValueStack";
import { LazySection } from "@/components/ui/lazy-section";
import { SectionFadeTransition } from "@/components/ui/section-fade-transition";

const loadCalculatorSection = () =>
  import("@/components/home/SolarCalculatorFunnel").then((module) => ({
    default: module.SolarCalculatorFunnel,
  }));
const loadProductSection = () =>
  import("@/components/home/ProductSection").then((module) => ({
    default: module.ProductSection,
  }));
const loadTransformationSection = () =>
  import("@/components/home/TransformationReveal").then((module) => ({
    default: module.TransformationReveal,
  }));
const loadMissionSection = () =>
  import("@/components/home/MissionSection").then((module) => ({
    default: module.MissionSection,
  }));
const loadTrustSection = () =>
  import("@/components/home/TrustSection").then((module) => ({
    default: module.TrustSection,
  }));
const loadFinalCta = () =>
  import("@/components/home/FinalCta").then((module) => ({
    default: module.FinalCta,
  }));

const LazyCalculatorSection = lazy(loadCalculatorSection);
const LazyProductSection = lazy(loadProductSection);
const LazyTransformationSection = lazy(loadTransformationSection);
const LazyMissionSection = lazy(loadMissionSection);
const LazyTrustSection = lazy(loadTrustSection);
const LazyFinalCta = lazy(loadFinalCta);

const Index = () => {
  return (
    <div className="relative">
      <SEO path="/" />
      <Hero />
      <div className="theme-light relative z-0 bg-background text-foreground">
        <SectionFadeTransition darkTop />
        <ProblemSection />
        <SystemSection />
        <ValueStack />
        <ConversionBand />
        <SectionFadeTransition className="-mt-px" />
        <section
          id="savings-estimate"
          className="relative overflow-hidden border-y border-border/60 bg-secondary/35 px-6 py-24 sm:py-32"
        >
          <LazySection
            component={LazyCalculatorSection}
            minHeight={720}
            preload={loadProductSection}
          />
        </section>
        <LazySection
          component={LazyProductSection}
          minHeight={1180}
          preload={loadTransformationSection}
        />
        <LazySection
          component={LazyTransformationSection}
          minHeight={980}
          preload={loadMissionSection}
        />
        <SectionFadeTransition darkTop className="-mt-px" />
        <LazySection
          component={LazyMissionSection}
          minHeight={720}
          preload={loadTrustSection}
        />
        <LazySection
          component={LazyTrustSection}
          minHeight={1280}
          preload={loadFinalCta}
        />
        <SectionFadeTransition className="-mt-px" />
        <LazySection component={LazyFinalCta} minHeight={460} />
      </div>
    </div>
  );
};

export default Index;
