import { lazy } from "react";

import { SEO } from "@/components/SEO";
import { Hero } from "@/components/home/Hero";
import { WireTicker } from "@/components/home/WireTicker";
import { LazySection } from "@/components/ui/lazy-section";
import { SectionFadeTransition } from "@/components/ui/section-fade-transition";

const loadProblemSection = () =>
  import("@/components/home/ProblemSection").then((module) => ({
    default: module.ProblemSection,
  }));
const loadSystemSection = () =>
  import("@/components/home/SystemSection").then((module) => ({
    default: module.SystemSection,
  }));
const loadValueStackSection = () =>
  import("@/components/home/ValueStack").then((module) => ({
    default: module.ValueStack,
  }));
const loadConversionBandSection = () =>
  import("@/components/home/ConversionBand").then((module) => ({
    default: module.ConversionBand,
  }));
const loadCalculatorSection = () =>
  import("@/components/home/HeroCalculator").then((module) => ({
    default: module.HeroCalculator,
  }));
const loadRecentProjectsSection = () =>
  import("@/components/home/RecentProjects").then((module) => ({
    default: module.RecentProjects,
  }));
const loadStatsShowcaseSection = () =>
  import("@/components/home/StatsShowcase").then((module) => ({
    default: module.StatsShowcase,
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

const LazyProblemSection = lazy(loadProblemSection);
const LazySystemSection = lazy(loadSystemSection);
const LazyValueStackSection = lazy(loadValueStackSection);
const LazyConversionBandSection = lazy(loadConversionBandSection);
const LazyCalculatorSection = lazy(loadCalculatorSection);
const LazyRecentProjectsSection = lazy(loadRecentProjectsSection);
const LazyStatsShowcaseSection = lazy(loadStatsShowcaseSection);
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
      <WireTicker />
      <div className="theme-light relative z-0 bg-background text-foreground">
        <SectionFadeTransition darkTop />
        <LazySection
          component={LazyProblemSection}
          eagerOnIdle
          minHeight={1180}
          mobileMinHeight={720}
          preload={loadSystemSection}
        />
        <LazySection
          component={LazySystemSection}
          eagerOnIdle
          minHeight={920}
          mobileMinHeight={620}
          preload={loadValueStackSection}
        />
        <LazySection
          component={LazyValueStackSection}
          eagerOnIdle
          minHeight={900}
          mobileMinHeight={640}
          preload={loadConversionBandSection}
        />
        <LazySection
          component={LazyConversionBandSection}
          eagerOnIdle
          minHeight={700}
          mobileMinHeight={520}
          preload={loadStatsShowcaseSection}
        />
        <LazySection
          component={LazyStatsShowcaseSection}
          eagerOnIdle
          minHeight={600}
          mobileMinHeight={400}
          preload={loadCalculatorSection}
        />
        <SectionFadeTransition className="-mt-px" />
        <section
          id="savings-estimate"
          className="relative overflow-hidden border-y border-border/60 bg-secondary/35 px-6 py-24 sm:py-32"
        >
          <LazySection
            component={LazyCalculatorSection}
            eagerOnIdle
            minHeight={720}
            mobileMinHeight={540}
            preload={loadProductSection}
          />
        </section>
        <LazySection
          component={LazyProductSection}
          minHeight={1180}
          mobileMinHeight={720}
          preload={loadRecentProjectsSection}
        />
        <LazySection
          component={LazyRecentProjectsSection}
          minHeight={800}
          mobileMinHeight={600}
          preload={loadTransformationSection}
        />
        <LazySection
          component={LazyTransformationSection}
          minHeight={980}
          mobileMinHeight={680}
          preload={loadMissionSection}
        />
        <SectionFadeTransition darkTop className="-mt-px" />
        <LazySection
          component={LazyMissionSection}
          minHeight={720}
          mobileMinHeight={520}
          preload={loadTrustSection}
        />
        <LazySection
          component={LazyTrustSection}
          minHeight={1280}
          mobileMinHeight={860}
          preload={loadFinalCta}
        />
        <SectionFadeTransition className="-mt-px" />
        <LazySection component={LazyFinalCta} minHeight={460} mobileMinHeight={360} />
      </div>
    </div>
  );
};

export default Index;
