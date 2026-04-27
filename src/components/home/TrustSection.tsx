import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import { StartAssessmentLink } from "@/components/AssessmentCtas";
import { splitWords } from "@/lib/split-words";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASING, DURATION, STAGGER, SCROLL } from "@/lib/animations";
import { useSiteCopy } from "@/lib/site-copy";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [p1, p2, p3];

export const TrustSection = () => {
  const copy = useSiteCopy();
  const root = useRef<HTMLElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      if (counter.current) counter.current.textContent = "3";
      return;
    }

    const ctx = gsap.context(() => {
      const eyebrowInners = splitWords(eyebrowRef.current);
      const headlineInners = splitWords(headlineRef.current);

      gsap.set([...eyebrowInners, ...headlineInners], { yPercent: 110, autoAlpha: 0 });

      gsap.to(eyebrowInners, {
        yPercent: 0,
        autoAlpha: 1,
        duration: DURATION.standard,
        ease: EASING.reveal,
        stagger: STAGGER.text,
        scrollTrigger: { trigger: root.current, start: SCROLL.revealStart },
      });
      gsap.to(headlineInners, {
        yPercent: 0,
        autoAlpha: 1,
        duration: DURATION.standard,
        ease: EASING.reveal,
        stagger: STAGGER.text,
        scrollTrigger: { trigger: root.current, start: SCROLL.revealStart },
        delay: 0.1,
      });

      gsap.from("[data-card]", {
        y: 50,
        autoAlpha: 0,
        duration: DURATION.standard,
        ease: EASING.smooth,
        stagger: STAGGER.cards,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      const obj = { v: 0 };
      gsap.to(obj, {
        v: 3,
        duration: DURATION.dramatic,
        ease: "power2.out",
        scrollTrigger: { trigger: counter.current, start: "top 80%" },
        onUpdate: () => {
          if (counter.current) counter.current.textContent = Math.floor(obj.v).toString();
        },
      });
    }, root);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={root} className="relative overflow-hidden bg-background py-24 sm:py-40">
      <div className="container-tight">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <div>
            <div ref={eyebrowRef} className="eyebrow text-primary/80">
              {copy.trust.eyebrow}
            </div>
            <h2 ref={headlineRef} className="display-lg mt-5 max-w-xl text-balance text-foreground">
              {copy.trust.headline}
            </h2>
          </div>
          <div className="text-right">
            <div className="display-lg leading-none text-foreground">
              <span ref={counter}>0</span>
            </div>
            <div className="eyebrow mt-2 text-muted-foreground">{copy.common.referenceGallery}</div>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-muted-foreground">{copy.trust.body}</p>
      </div>

      <div className="mt-20 relative w-full overflow-hidden border-y border-border/70 bg-secondary/18 py-12 group">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background via-background/92 to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background via-background/92 to-transparent sm:w-16" />

        {prefersReducedMotion ? (
          <div className="no-scrollbar overflow-x-auto snap-x snap-mandatory px-6">
            <div className="flex min-w-max gap-5 pb-2">
              {copy.trust.cards.map((p, i) => (
                <article
                  key={p.title}
                  data-card
                  className="ivory-panel group/card relative w-[300px] flex-none snap-start overflow-hidden rounded-[1.6rem] border border-border/70"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={PROJECTS[i % PROJECTS.length]}
                      alt={`${p.title} ${p.location}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/88 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 border-t border-border/70 bg-background/92 p-6 backdrop-blur-md">
                    <div className="font-mono text-xs uppercase tracking-widest text-primary/85">{p.location}</div>
                    <div className="mt-2 text-base font-medium tracking-tight text-foreground">{p.title}</div>
                    <div className="mt-1 text-sm text-foreground/72">{p.system}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="no-scrollbar overflow-x-auto snap-x snap-mandatory px-6 md:hidden">
              <div className="flex min-w-max gap-5 pb-2">
                {copy.trust.cards.map((p, i) => (
                  <article
                    key={p.title}
                    data-card
                    className="ivory-panel group/card relative w-[300px] flex-none snap-start overflow-hidden rounded-[1.6rem] border border-border/70"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={PROJECTS[i % PROJECTS.length]}
                        alt={`${p.title} ${p.location}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/88 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 border-t border-border/70 bg-background/92 p-6 backdrop-blur-md">
                      <div className="font-mono text-xs uppercase tracking-widest text-primary/85">{p.location}</div>
                      <div className="mt-2 text-base font-medium tracking-tight text-foreground">{p.title}</div>
                      <div className="mt-1 text-sm text-foreground/72">{p.system}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="hidden w-max gap-12 px-8 md:flex md:motion-safe:animate-[marquee_56s_linear_infinite] group-hover:[animation-play-state:paused]">
              {[...copy.trust.cards, ...copy.trust.cards, ...copy.trust.cards, ...copy.trust.cards].map((p, i) => (
                <article
                  key={i}
                  data-card
                  className="ivory-panel group/card relative w-[300px] flex-none overflow-hidden rounded-[1.6rem] border border-border/70 transition-all duration-700 hover:border-primary/45 sm:w-[450px]"
                >
                  <div className="aspect-[16/10] overflow-hidden transition-all duration-700">
                    <img
                      src={PROJECTS[i % PROJECTS.length]}
                      alt={`${p.title} ${p.location}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-1000 group-hover/card:scale-110"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/88 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 border-t border-border/70 bg-background/92 p-6 backdrop-blur-md translate-y-2 transition-transform duration-500 group-hover/card:translate-y-0">
                    <div className="font-mono text-xs uppercase tracking-widest text-primary/85">{p.location}</div>
                    <div className="mt-2 text-base font-medium tracking-tight text-foreground">{p.title}</div>
                    <div className="mt-1 text-sm text-foreground/72">{p.system}</div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="container-tight mt-20 border-t border-border/70 pt-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
          {copy.trust.checklistTitle}
        </p>
        <div className="grid grid-cols-2 gap-8 items-center sm:grid-cols-4">
          {copy.trust.checklist.map((name) => (
            <div key={name} className="text-sm font-medium tracking-tight text-foreground/60">
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="container-tight mt-12 flex justify-end">
        <StartAssessmentLink source="trust-section" />
      </div>
    </section>
  );
};
