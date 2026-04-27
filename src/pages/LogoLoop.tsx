import { SEO } from "@/components/SEO";
import { LogoLoopScene } from "@/components/logo-loop/LogoLoopScene";

const LogoLoop = () => {
  return (
    <>
      <SEO
        title="Exact Logo Loop Study"
        description="A Remotion-authored reconstruction of a minimal geometric loop animation."
      />
      <LogoLoopScene />
    </>
  );
};

export default LogoLoop;
