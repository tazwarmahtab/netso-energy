import { SEO } from "@/components/SEO";
import { Hero } from "@/components/home/Hero";
import { ConversionBand } from "@/components/home/ConversionBand";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SystemSection } from "@/components/home/SystemSection";
import { TransformationReveal } from "@/components/home/TransformationReveal";
import { MissionSection } from "@/components/home/MissionSection";
import { ProductSection } from "@/components/home/ProductSection";
import { ValueStack } from "@/components/home/ValueStack";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCta } from "@/components/home/FinalCta";
import { SolarCalculatorFunnel } from "@/components/home/SolarCalculatorFunnel";
import { SectionShaderTransition } from "@/components/ui/section-shader-transition";

const Index = () => {
  return (
    <div className="relative">
      <SEO path="/" />
      <Hero />
      <div className="theme-light relative z-0 bg-background text-foreground">
        <SectionShaderTransition darkTop />
        <ProblemSection />
        <SystemSection />
        <ValueStack />
        <ConversionBand />
        <SectionShaderTransition className="-mt-px" />
        <section
          id="savings-estimate"
          className="relative overflow-hidden border-y border-border/60 bg-secondary/35 px-6 py-24 sm:py-32"
        >
          <SolarCalculatorFunnel />
        </section>
        <ProductSection />
        <TransformationReveal />
        <SectionShaderTransition darkTop className="-mt-px" />
        <MissionSection />
        <TrustSection />
        <SectionShaderTransition className="-mt-px" />
        <FinalCta />
      </div>
    </div>
  );
};

export default Index;
