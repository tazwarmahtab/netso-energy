"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, Factory, GraduationCap, HeartPulse, Hotel, Warehouse } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/lib/i18n";
import { bdPhoneRegex, createCalculatorLeadPayload, type StartAssessmentSessionResponse } from "@/lib/lead-types";
import { AssessmentBackendUnavailableError, startAssessmentSession } from "@/lib/lead-service";
import { isSupabaseBrowserConfigured } from "@/lib/supabase-client";
import { calculateSolarAssessment, type SolarAssessmentInput } from "@/lib/solar-engine";
import { scoreSolarOpportunity } from "@/lib/opportunity-score";
import { buildWhatsAppStartUrl, isWhatsAppConfigured } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type FacilityType = SolarAssessmentInput["facilityType"];
type Step = "facility" | "location" | "energy" | "roof" | "objective" | "results" | "contact";
type FormState = { facilityType?: FacilityType; location: string; monthlyKwh: string; monthlyBill: string; roofM2: string; objective: "savings" | "grid" | "renewable" | "zero_upfront"; name: string; phone: string };
const initial: FormState = { location: "", monthlyKwh: "", monthlyBill: "", roofM2: "", objective: "savings", name: "", phone: "" };
const steps: Step[] = ["facility", "location", "energy", "roof", "objective", "results", "contact"];
const facilityOptions: Array<{ value: FacilityType; label: string; icon: typeof Factory }> = [
  { value: "factory", label: "Factory", icon: Factory }, { value: "commercial", label: "Commercial building", icon: Building2 }, { value: "school", label: "School / institution", icon: GraduationCap }, { value: "hospital", label: "Hospital", icon: HeartPulse }, { value: "hotel", label: "Hotel", icon: Hotel }, { value: "warehouse", label: "Warehouse", icon: Warehouse },
];
function num(value: string) { const n = Number(value); return Number.isFinite(n) && n > 0 ? n : undefined; }

export function SolarIntelligenceFunnel() {
  const { language } = useLanguage();
  const bn = language === "bn";
  const [step, setStep] = useState(0); const [form, setForm] = useState<FormState>(initial); const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState<StartAssessmentSessionResponse["session"] | null>(null); const [error, setError] = useState("");
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));
  const input: SolarAssessmentInput = useMemo(() => ({ facilityType: form.facilityType ?? "factory", location: form.location || undefined, monthlyConsumptionKwh: num(form.monthlyKwh), monthlyBillBdt: num(form.monthlyBill), usableRoofAreaM2: num(form.roofM2), ppaInterest: form.objective === "zero_upfront" }), [form]);
  const result = useMemo(() => calculateSolarAssessment(input), [input]);
  const opportunity = useMemo(() => scoreSolarOpportunity({ facilityType: input.facilityType, estimatedCapacityKwp: result.recommendedCapacityKwp, ppaInterest: !!input.ppaInterest, dataCompleteness: [input.location, input.monthlyConsumptionKwh, input.monthlyBillBdt, input.usableRoofAreaM2].filter(Boolean).length / 4 }), [input, result.recommendedCapacityKwp]);
  const goNext = () => { setError(""); setStep((value) => Math.min(value + 1, steps.length - 1)); }; const goBack = () => { setError(""); setStep((value) => Math.max(value - 1, 0)); };

  const submit = async () => {
    if (form.name.trim().length < 2) return setError(bn ? "আপনার নাম লিখুন।" : "Enter your name.");
    if (!bdPhoneRegex.test(form.phone.trim())) return setError(bn ? "একটি বৈধ বাংলাদেশি নম্বর দিন।" : "Enter a valid Bangladesh phone number.");
    setSubmitting(true); setError("");
    const savings = result.annualSavingsBdt ?? 0;
    const lifetime = result.twentyYearSavingsBdt ?? 0;
    const payback = savings > 0 && result.capexEstimateBdt ? result.capexEstimateBdt / savings : 1;
    const profit = lifetime - (result.capexEstimateBdt ?? 0);
    const estimate = {
      systemKwp: result.recommendedCapacityKwp,
      systemKwpRange: { low: result.recommendedCapacityKwp * 0.9, midpoint: result.recommendedCapacityKwp, high: result.recommendedCapacityKwp * 1.1 },
      monthlySavingsBdt: savings / 12, monthlySavingsBdtRange: { low: Math.max(0, savings * 0.9 / 12), midpoint: savings / 12, high: savings * 1.1 / 12 },
      annualSavingsBdt: savings, ppaTermSavingsBdt: lifetime, ppaTermSavingsBdtRange: { low: lifetime * 0.9, midpoint: lifetime, high: lifetime * 1.1 },
      annualGenerationKwh: result.annualGenerationKwh, co2SavedTonnes: result.co2AvoidedTonnes, confidenceLabel: "resco_ppa" as const, assumptions: result.flags.length ? result.flags : ["Governed Netso assumption snapshot used."], disclaimer: result.disclaimer, assumptionsVersion: result.assumptionsVersion, confidence: result.confidence,
      monthlySavings: savings / 12, monthlySavingsRange: { low: Math.max(0, savings * 0.9 / 12), midpoint: savings / 12, high: savings * 1.1 / 12 }, paybackYears: payback, paybackYearsRange: { low: payback * 0.9, midpoint: payback, high: payback * 1.1 }, twentyYearProfit: profit, twentyYearProfitRange: { low: profit * 0.9, midpoint: profit, high: profit * 1.1 }, co2Saved: result.co2AvoidedTonnes,
    };
    try {
      if (!isSupabaseBrowserConfigured()) throw new AssessmentBackendUnavailableError("Assessment backend unavailable");
      const payload = createCalculatorLeadPayload({ preferredLanguage: language, name: form.name, phone: form.phone }, { calculatorBillEstimate: num(form.monthlyBill), calculatorConsumptionKwh: num(form.monthlyKwh), calculatorAreaEstimate: num(form.roofM2), modelOutput: estimate, opportunityScore: opportunity.score, opportunityBand: opportunity.band, facilityType: input.facilityType, location: input.location, ppaInterest: input.ppaInterest });
      const response = await startAssessmentSession(payload); setSubmitted(response.session);
      if (isWhatsAppConfigured() && typeof window !== "undefined") window.location.assign(buildWhatsAppStartUrl({ language, source: "calculator_handoff", sessionId: response.session.id })); else toast.success(bn ? "অ্যাসেসমেন্ট শুরু হয়েছে।" : "Assessment started.");
    } catch (cause) { if (cause instanceof AssessmentBackendUnavailableError && isWhatsAppConfigured() && typeof window !== "undefined") window.location.assign(buildWhatsAppStartUrl({ language, source: "calculator_handoff_manual" })); else setError(cause instanceof Error ? cause.message : (bn ? "আবার চেষ্টা করুন।" : "Please try again.")); } finally { setSubmitting(false); }
  };

  if (submitted) return <div className="ivory-panel mx-auto w-full max-w-3xl rounded-[32px] border p-8 text-center sm:p-12"><CheckCircle2 className="mx-auto h-12 w-12 text-primary" /><h2 className="mt-5 font-display text-3xl">{bn ? "অ্যাসেসমেন্ট শুরু হয়েছে" : "Assessment started"}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{bn ? "আপনার প্রাথমিক হিসাবটি NETSO টিম রিভিউ করবে।" : "Your preliminary estimate is ready for the Netso team to review."}</p></div>;
  const current = steps[step]; const headings: Record<Step, string> = { facility: bn ? "আপনার প্রতিষ্ঠান কী ধরনের?" : "What type of facility do you have?", location: bn ? "আপনার facility কোথায়?" : "Where is your facility?", energy: bn ? "আপনার বিদ্যুৎ ব্যবহার কত?" : "How much electricity does your facility use?", roof: bn ? "কতটুকু usable roof space আছে?" : "How much usable roof space do you have?", objective: bn ? "আপনার প্রধান লক্ষ্য কী?" : "What matters most to you?", results: bn ? "আপনার solar potential" : "Your solar potential", contact: bn ? "আপনার Netso assessment নিন" : "Get your Netso assessment" }; const progress = ((step + 1) / steps.length) * 100;
  return <div className="ivory-panel mx-auto w-full max-w-4xl overflow-hidden rounded-[32px] border border-border/70 shadow-[0_24px_70px_rgba(37,23,8,0.08)]"><div className="px-6 pt-6 sm:px-10 sm:pt-8"><div className="flex justify-between text-xs font-semibold text-muted-foreground"><span>NETSO SOLAR INTELLIGENCE</span><span>{step + 1} / {steps.length}</span></div><div className="mt-3 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div></div><div className="p-6 sm:p-10"><h2 className="max-w-2xl font-display text-3xl tracking-[-0.03em] sm:text-5xl">{headings[current]}</h2><div className="mt-8">
    {current === "facility" && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{facilityOptions.map(({ value, label, icon: Icon }) => <button key={value} onClick={() => { update("facilityType", value); goNext(); }} className={cn("flex min-h-28 flex-col items-start justify-between rounded-2xl border p-5 text-left transition hover:border-primary", form.facilityType === value && "border-primary bg-primary/5")}><Icon className="h-6 w-6" /><span className="text-sm font-semibold">{label}</span></button>)}</div>}
    {current === "location" && <div className="max-w-xl"><input autoFocus value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Chattogram" className="w-full rounded-2xl border bg-background px-5 py-4 text-lg outline-none focus:border-primary" /><p className="mt-3 text-sm text-muted-foreground">{bn ? "শহর বা জেলা লিখুন।" : "City or district is enough for the preliminary estimate."}</p></div>}
    {current === "energy" && <div className="grid gap-4 sm:grid-cols-2"><label className="rounded-2xl border p-5"><span className="text-sm font-semibold">Monthly consumption (kWh)</span><input inputMode="decimal" value={form.monthlyKwh} onChange={(e) => update("monthlyKwh", e.target.value)} placeholder="e.g. 100000" className="mt-3 w-full border-b bg-transparent py-2 text-2xl outline-none focus:border-primary" /></label><label className="rounded-2xl border p-5"><span className="text-sm font-semibold">Monthly electricity bill (BDT)</span><input inputMode="decimal" value={form.monthlyBill} onChange={(e) => update("monthlyBill", e.target.value)} placeholder="e.g. 1200000" className="mt-3 w-full border-b bg-transparent py-2 text-2xl outline-none focus:border-primary" /></label><p className="sm:col-span-2 text-sm text-muted-foreground">{bn ? "একটি বা দুটিই দিতে পারেন।" : "Provide either or both. Savings require enough tariff context to be reliable."}</p></div>}
    {current === "roof" && <div className="max-w-xl"><label className="block rounded-2xl border p-5"><span className="text-sm font-semibold">Usable roof area (m²)</span><input inputMode="decimal" value={form.roofM2} onChange={(e) => update("roofM2", e.target.value)} placeholder="e.g. 3000" className="mt-3 w-full border-b bg-transparent py-2 text-2xl outline-none focus:border-primary" /></label><button onClick={goNext} className="mt-4 text-sm font-semibold text-primary">I don't know → continue</button></div>}
    {current === "objective" && <div className="grid gap-3 sm:grid-cols-2">{([["savings","Reduce electricity costs"],["grid","Reduce grid dependence"],["renewable","Increase renewable energy"],["zero_upfront","Go solar with zero upfront investment"]] as const).map(([value,label]) => <button key={value} onClick={() => { update("objective", value); goNext(); }} className={cn("rounded-2xl border p-5 text-left font-semibold", form.objective === value && "border-primary bg-primary/5")}>{label}</button>)}</div>}
    {current === "results" && <div><div className="grid gap-3 sm:grid-cols-3"><Metric label="Estimated capacity" value={`${result.recommendedCapacityKwp.toLocaleString()} kWp`} /><Metric label="Annual generation" value={`${Math.round(result.annualGenerationKwh / 1000)} MWh`} /><Metric label="Potential annual savings" value={result.annualSavingsBdt ? `৳${Math.round(result.annualSavingsBdt).toLocaleString()}` : "Needs tariff data"} /></div><div className="mt-6 rounded-2xl border p-5"><p className="font-semibold">Netso PPA</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Netso can potentially finance, own and operate the solar asset while your facility purchases solar electricity under a long-term PPA. Final terms are project-specific.</p></div><p className="mt-4 text-xs leading-5 text-muted-foreground">{result.disclaimer}</p></div>}
    {current === "contact" && <div className="max-w-xl space-y-4"><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" className="w-full rounded-2xl border bg-background px-5 py-4 outline-none focus:border-primary" /><input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Bangladesh phone number" className="w-full rounded-2xl border bg-background px-5 py-4 outline-none focus:border-primary" />{error && <p className="text-sm text-destructive">{error}</p>}</div>}
  </div>{current !== "facility" && current !== "objective" && <div className="flex items-center justify-between gap-3 px-6 pb-7 sm:px-10 sm:pb-10"><button onClick={goBack} className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back</button>{current === "contact" ? <button disabled={submitting} onClick={submit} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">{submitting ? "Starting…" : "Get my assessment"}<ArrowRight className="h-4 w-4" /></button> : <button onClick={goNext} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Continue <ArrowRight className="h-4 w-4" /></button>}</div>}</div></div>;
}
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">{value}</p></div>; }
