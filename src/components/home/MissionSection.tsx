"use client";

import { TextRevealByWord } from "@/components/ui/text-reveal";
import { useSiteCopy } from "@/lib/site-copy";

export const MissionSection = () => {
  const copy = useSiteCopy();

  return (
    <section className="relative w-full bg-background overflow-hidden">
      <TextRevealByWord
        text={copy.mission.text}
      />
    </section>
  );
};
