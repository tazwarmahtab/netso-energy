import { EstimateLink, StartAssessmentLink } from "@/components/AssessmentCtas";
import { useSiteCopy } from "@/lib/site-copy";

export const ConversionBand = () => {
  const copy = useSiteCopy();

  return (
    <section className="relative overflow-hidden bg-secondary/28 py-24 md:py-32">
      <div className="container-tight">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="ivory-panel rounded-[2rem] p-8 md:p-10">
            <p className="eyebrow mb-5 text-primary/80">{copy.conversionBand.eyebrow}</p>
            <h2 className="display-text max-w-3xl text-4xl text-balance text-foreground md:text-6xl">
              {copy.conversionBand.headline}
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{copy.conversionBand.body}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <StartAssessmentLink source="conversion-band" />
              <EstimateLink source="conversion-band" />
            </div>
          </div>

          <div className="ivory-panel rounded-[2rem] p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{copy.conversionBand.checklistTitle}</p>
            <div className="mt-6 grid gap-3">
              {copy.conversionBand.checklist.map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-border/70 bg-secondary/28 px-4 py-3 text-sm text-foreground">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">{copy.conversionBand.fallbackBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
