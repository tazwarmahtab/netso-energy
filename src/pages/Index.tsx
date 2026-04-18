import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SystemSection } from "@/components/home/SystemSection";
import { TransformationSection } from "@/components/home/TransformationSection";
import { ProductSection } from "@/components/home/ProductSection";
import { ValueStack } from "@/components/home/ValueStack";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCta } from "@/components/home/FinalCta";

const Index = () => {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SystemSection />
      <TransformationSection />
      <ProductSection />
      <ValueStack />
      <TrustSection />
      <FinalCta />
    </>
  );
};

export default Index;
