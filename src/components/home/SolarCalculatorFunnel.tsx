"use client";

import { CSSProperties, FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calculator, CheckCircle, ChevronRight, Info, MapPin } from "lucide-react";
import { toast } from "sonner";

import { StartAssessmentLink } from "@/components/AssessmentCtas";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import {
  bdPhoneRegex,
  billExtractionDraftSchema,
  createCalculatorLeadPayload,
  type StartAssessmentSessionResponse,
} from "@/lib/lead-types";
import {
  AssessmentBackendUnavailableError,
  startAssessmentSession,
} from "@/lib/lead-service";
import { isSupabaseBrowserConfigured } from "@/lib/supabase-client";
import {
  estimateMonthlyConsumptionFromBill,
  getSavingsModel,
  SOLAR_ENGINE_CONSTANTS,
  TARIFF_BENCHMARKS,
  type PropertySegment,
  type RegionCode,
  type RescoSavingsModel,
} from "@/lib/solar-engine";
import { useSiteCopy } from "@/lib/site-copy";
import { cn } from "@/lib/utils";
import { buildWhatsAppStartUrl, isWhatsAppConfigured } from "@/lib/whatsapp";

type CalculatorFormState = {
  name: string;
  phone: string;
  address: string;
};

type RangeStyle = CSSProperties & {
  "--range-progress": string;
};

const initialFormState: CalculatorFormState = {
  name: "",
  phone: "",
  address: "",
};

type BillDraftState = {
  /** Raw bill document reference (e.g. file name); row/column data live in storage, UI holds none of PII beyond confirmation. */
  publicId: string;
  billingPeriod: string;
  billingDemandKva: string;
  monthlyConsumptionKwh: string;
  exportedEnergyKwh: string;
  netMeteringObserved: boolean;
  confirmedByUser: boolean;
};

const initialBillDraftState: BillDraftState = {
  publicId: "",
  billingPeriod: "",
  billingDemandKva: "",
  monthlyConsumptionKwh: "",
  exportedEnergyKwh: "",
  netMeteringObserved: false,
  confirmedByUser: false,
};

const billRange = {
  min: 1500,
  max: 40000,
  step: 500,
};

const areaRange = {
  min: 250,
  max: 5000,
  step: 50,
};

const buildRangeStyle = (value: number, min: number, max: number): RangeStyle => ({
  "--range-progress": `${((value - min) / (max - min)) * 100}%`,
});

export function SolarCalculatorFunnel() {
  const { language } = useLanguage();
  const copy = useSiteCopy();
  const isBn = language === "bn";
  const [step, setStep] = useState(1);
  const [segment, setSegment] = useState<PropertySegment>("c_and_i");
  const [region, setRegion] = useState<RegionCode>("dhaka");
  const [bill, setBill] = useState(12000);
  const [area, setArea] = useState(1200);
  const [peakDemandKva, setPeakDemandKva] = useState(15);
  const [showDemandDetail, setShowDemandDetail] = useState(false);
  const [billDraft, setBillDraft] = useState<BillDraftState>(initialBillDraftState);
  const [formState, setFormState] = useState<CalculatorFormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof CalculatorFormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedSession, setSubmittedSession] =
    useState<StartAssessmentSessionResponse["session"] | null>(null);

  const labels = {
    eyebrow: isBn ? "ধাপ ০১ — প্রাথমিক ছাদ সমীক্ষা" : "Step 01 — Preliminary roof study",
    headline: isBn
      ? "৩০ সেকেন্ডে আপনার ছাদের সম্ভাবনা হিসাব করুন।"
      : "Calculate your rooftop potential in 30 seconds.",
    body: isBn
      ? "প্রথমে ছাদের প্রেক্ষাপট ও লোকেশন দিন, তারপর বিল থেকে প্রাথমিক সেভিংস দেখুন। সাইট-স্পেসিফিক রিভিউ পরে হবে।"
      : "Start with roof context and location, then see first-pass savings from your bill. Site-specific engineering review follows.",
    bill: isBn ? "গড় মাসিক বিল" : "Average monthly bill",
    area: isBn ? "ছাদের আকার" : "Rooftop area",
    regionLabel: isBn ? "লোকেশন" : "Location",
    dhaka: isBn ? "ঢাকা" : "Dhaka",
    chattogram: isBn ? "চট্টগ্রাম / উপকূল" : "Chattogram / Coastal",
    otherRegion: isBn ? "অন্যান্য জেলা" : "Other district",
    demandLabel: isBn ? "বিলড ডিমান্ড (kVA, ঐচ্ছিক)" : "Billed demand (kVA, optional)",
    demandDetailToggle: isBn ? "ডিমান্ড-চার্জ ব্রেকডাউন দেখুন" : "View demand-charge breakdown",
    billDraftTitle: isBn ? "বিল ড্রাফট (ঐচ্ছিক)" : "Bill draft (optional)",
    billDraftBody: isBn
      ? "ডকুমেন্ট প্রাইভেট থাকে এবং হোয়াটসঅ্যাপে ফরোয়ার্ড হয় না। ক্যালকুলেটরে ব্যবহারের আগে মানগুলো কনফার্ম করুন।"
      : "Documents stay private and are never forwarded over WhatsApp. Confirm values before they feed the study.",
    billDraftConfirm: isBn ? "মান কনফার্ম করে সমীক্ষায় ব্যবহার করুন" : "Confirm values for the study",
    cta: isBn ? "সেভিংস হিসাব করুন" : "Calculate my savings",
    resultsEyebrow: isBn ? "প্রাথমিক পরিকল্পনা-ভিত্তিক হিসাব" : "Indicative planning estimate",
    resultsHeadline: isBn
      ? "আপনার ছাদে উল্লেখযোগ্য এনার্জি ভ্যালু থাকতে পারে।"
      : "Your roof may have meaningful energy value.",
    resultsBody: isBn
      ? "প্রাথমিক ছাদ সমীক্ষা আগে; সাইট-স্পেসিফিক ইঞ্জিনিয়ারিং রিভিউ পরে। এটি মূল্য উদ্ধৃতি বা পারফরম্যান্স গ্যারান্টি নয়।"
      : "A preliminary roof study first; site-specific engineering review follows. This is not a price quote or performance guarantee.",
    contactHeadline: isBn ? "অ্যাসেসমেন্ট চালিয়ে যান" : "Continue with your assessment",
    contactBody: isBn
      ? "আপনার তথ্য দিন এবং হোয়াটসঅ্যাপে চালিয়ে যান, যাতে NETSO আপনার ছাদের প্রেক্ষাপট ও পরের ধাপের উপযোগিতা রিভিউ করতে পারে।"
      : "Enter your details and continue on WhatsApp so NETSO can review your rooftop context and next-step fit.",
    monthlySavings: isBn ? "মাসিক সেভিংস" : "Monthly Savings",
    systemSize: isBn ? "সিস্টেম সাইজ" : "System Size",
    twentyYearValue: isBn ? "২০ বছরের পরিকল্পিত ভ্যালু" : "20-Year PPA Savings",
    annualGeneration: isBn ? "বার্ষিক উৎপাদন" : "Annual Generation",
    co2Saved: isBn ? "CO₂ সাশ্রয়" : "CO₂ Offset",
    demandSavings: isBn ? "ডিমান্ড সাশ্রয় (ইলাস্ট্রেটিভ)" : "Demand savings (illustrative)",
    totalValue: isBn ? "মোট আনুমানিক মাসিক ভ্যালু" : "Total indicative monthly value",
    exportNotice: isBn ? "নেট-মিটারিং রপ্তানি নোট" : "Net-metering export note",
    assumptions: isBn ? "হিসাবের অনুমানসমূহ" : "Estimate assumptions",
    continueWhatsApp: copy.common.continueWhatsApp,
    name: isBn ? "পূর্ণ নাম" : "Full name",
    phone: isBn ? "ফোন নম্বর" : "Phone number",
    address: isBn ? "ঠিকানা (ঐচ্ছিক)" : "Address (optional)",
    sending: isBn ? "অ্যাসেসমেন্ট শুরু হচ্ছে…" : "Starting assessment…",
    fallbackSuccess: isBn ? "অ্যাসেসমেন্ট শুরু হয়েছে।" : "Assessment started.",
    doneHeadline: isBn ? "অ্যাসেসমেন্ট শুরু হয়েছে।" : "Assessment started.",
    doneBody: isBn
      ? "আপনার হিসাবটি অ্যাসেসমেন্টের সাথে যুক্ত হয়েছে। NETSO আপনার দেওয়া তথ্য রিভিউ করে পরের ধাপ জানাবে।"
      : "Your estimate has been attached to the assessment. NETSO will review the details you shared and follow up with the next step.",
    startOver: isBn ? "আবার শুরু করুন" : "Start over",
    error: isBn ? "দয়া করে হাইলাইট করা ফিল্ডগুলো ঠিক করুন।" : "Please fix the highlighted fields.",
    phoneError: isBn ? "একটি বৈধ বাংলাদেশি নম্বর দিন।" : "Enter a valid Bangladesh number.",
    nameError: isBn ? "আপনার পূর্ণ নাম লিখুন।" : "Enter your full name.",
    segmentLabel: isBn ? "প্রপার্টির ধরন" : "Property Type",
    segmentCnI: isBn ? "বাণিজ্যিক/শিল্প" : "Commercial/Factory",
    segmentCommonService: isBn ? "কমন সার্ভিস (পাম্প/লিফট)" : "Common Services",
    segmentResidential: isBn ? "আবাসিক ফ্ল্যাট" : "Residential Flat",
  };

  const estimatedMonthlyKwh = useMemo(
    () => estimateMonthlyConsumptionFromBill(bill, segment),
    [bill, segment],
  );

  const confirmedBillDraft = useMemo(() => {
    if (!billDraft.confirmedByUser) return undefined;

    const parsed = billExtractionDraftSchema.safeParse({
      publicId: billDraft.publicId.trim() || `manual-${Date.now()}`,
      billingPeriod: billDraft.billingPeriod.trim() || undefined,
      billingDemandKva: billDraft.billingDemandKva ? Number(billDraft.billingDemandKva) : undefined,
      monthlyConsumptionKwh: billDraft.monthlyConsumptionKwh ? Number(billDraft.monthlyConsumptionKwh) : undefined,
      exportedEnergyKwh: billDraft.exportedEnergyKwh ? Number(billDraft.exportedEnergyKwh) : undefined,
      netMeteringObserved: billDraft.netMeteringObserved,
      confirmedByUser: true,
    });

    return parsed.success ? parsed.data : undefined;
  }, [billDraft]);

  const model = useMemo(() => {
    return getSavingsModel(
      confirmedBillDraft?.monthlyConsumptionKwh ?? estimatedMonthlyKwh,
      area,
      segment,
      region,
      confirmedBillDraft?.billingDemandKva ?? peakDemandKva,
    );
  }, [area, confirmedBillDraft, estimatedMonthlyKwh, peakDemandKva, region, segment]);

  const manualWhatsAppDetails = useMemo(() => {
    const segmentLabel =
      segment === "residential_common_service"
        ? (isBn ? "কমন সার্ভিস (পাম্প/লিফট)" : "Common Services")
        : segment === "residential_multi_story"
          ? (isBn ? "আবাসিক ফ্ল্যাট" : "Residential Flat")
          : (isBn ? "বাণিজ্যিক/শিল্প" : "Commercial/Factory");

    const details = [
      `name=${formState.name.trim() || (isBn ? "দেওয়া হবে" : "to share in chat")}`,
      `phone=${formState.phone.trim() || (isBn ? "চ্যাটে শেয়ার" : "to share in chat")}`,
      `type=${segmentLabel}`,
      `roof=${area}sqft`,
      `bill=${bill}bdt`,
      `address=${formState.address.trim() || (isBn ? "শেয়ারের অপেক্ষায়" : "to share in chat")}`,
    ];

    return details;
  }, [area, bill, formState.address, formState.name, formState.phone, isBn, segment]);

  const validateContactStep = () => {
    const nextErrors: Partial<Record<keyof CalculatorFormState, string>> = {};
    if (formState.name.trim().length < 2) nextErrors.name = labels.nameError;
    if (!bdPhoneRegex.test(formState.phone.trim())) nextErrors.phone = labels.phoneError;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateContactStep()) {
      toast.error(labels.error);
      return;
    }

    setSubmitting(true);

    try {
      const calculatorSummary = [
        `type=${segment}`,
        `region=${region}`,
        `bill=${bill}`,
        `roof=${area}`,
        `kwp=${model.systemKwp}`,
        `savings=${model.monthlySavingsBdtRange.low}-${model.monthlySavingsBdtRange.high}`,
      ].join(",");

      if (!isSupabaseBrowserConfigured()) {
        if (isWhatsAppConfigured() && typeof window !== "undefined") {
          window.location.assign(
            buildWhatsAppStartUrl({
              language,
              source: "calculator_handoff",
              calculatorSummary,
            }),
          );
          return;
        }

        toast.error(isBn ? "অ্যাসেসমেন্ট সার্ভিস এখন উপলভ্য নয়।" : "Assessment service is unavailable right now.");
        return;
      }

      const payload = createCalculatorLeadPayload(
        {
          preferredLanguage: language,
          name: formState.name,
          phone: formState.phone,
          address: formState.address,
        },
        {
          calculatorBillEstimate: bill,
          calculatorAreaEstimate: area,
          propertySegment: segment,
          region,
          modelOutput: model,
          billExtraction: confirmedBillDraft,
        },
      );

      const result = await startAssessmentSession(payload);

      if (isWhatsAppConfigured() && typeof window !== "undefined") {
        window.location.assign(
          buildWhatsAppStartUrl({
            language,
            source: "calculator_handoff",
            sessionId: result.session.id,
            calculatorSummary,
          }),
        );
        return;
      }

      setSubmittedSession(result.session);
      toast.success(labels.fallbackSuccess);
    } catch (error) {
      if (error instanceof AssessmentBackendUnavailableError && isWhatsAppConfigured() && typeof window !== "undefined") {
        window.location.assign(
          buildWhatsAppStartUrl({
            language,
            source: "calculator_handoff_manual",
            calculatorSummary,
            details: manualWhatsAppDetails,
          }),
        );
        return;
      }

      toast.error(
        error instanceof Error
          ? error.message
          : isBn
            ? "এই মুহূর্তে আপনার অ্যাসেসমেন্ট শুরু করা যাচ্ছে না।"
            : "Unable to start your assessment right now.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ivory-panel relative mx-auto w-full max-w-5xl overflow-hidden rounded-[32px] border border-border/70 shadow-[0_24px_70px_rgba(37,23,8,0.08)]">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative z-10 p-8 sm:p-12"
          >
            <div className="mb-8 flex items-center gap-3 text-primary/78">
              <Calculator className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{labels.eyebrow}</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <h2 className="max-w-[12ch] font-display text-3xl leading-[0.92] tracking-[-0.04em] text-foreground sm:text-5xl">
                  {labels.headline}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                  {labels.body}
                </p>
              </div>

              <div className="space-y-6 rounded-[24px] border border-border/70 bg-secondary/28 p-6">
                <div>
                  <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {labels.segmentLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "c_and_i", label: labels.segmentCnI },
                      { id: "residential_common_service", label: labels.segmentCommonService },
                      { id: "residential_multi_story", label: labels.segmentResidential },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSegment(item.id as PropertySegment)}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-center text-xs font-medium transition-all",
                          segment === item.id
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border/80 bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {labels.regionLabel}
                    </label>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {region === "chattogram" ? "16.5% CF" : region === "other" ? "15.1% CF" : "15.3% CF"}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "dhaka", label: labels.dhaka },
                      { id: "chattogram", label: labels.chattogram },
                      { id: "other", label: labels.otherRegion },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRegion(item.id as RegionCode)}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-center text-xs font-medium transition-all",
                          region === item.id
                            ? "border-primary/60 bg-primary/15 text-foreground shadow-sm"
                            : "border-border/80 bg-background/80 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <label htmlFor="bill-slider" className="text-sm font-medium text-muted-foreground">
                      {labels.bill}
                    </label>
                    <span className="text-2xl font-bold text-foreground">৳ {bill.toLocaleString()}</span>
                  </div>
                  <input
                    id="bill-slider"
                    type="range"
                    min={billRange.min}
                    max={billRange.max}
                    step={billRange.step}
                    value={bill}
                    onChange={(event) => setBill(Number(event.target.value))}
                    className="calc-range w-full cursor-pointer appearance-none rounded-full bg-border/70 accent-primary"
                    style={buildRangeStyle(bill, billRange.min, billRange.max)}
                  />
                </div>

                <div>
                  <div className="mb-4 flex items-end justify-between gap-4">
                    <label htmlFor="area-slider" className="text-sm font-medium text-muted-foreground">
                      {labels.area}
                    </label>
                    <span className="text-2xl font-bold text-foreground">
                      {area.toLocaleString()} {isBn ? "বর্গফুট" : "sqft"}
                    </span>
                  </div>
                  <input
                    id="area-slider"
                    type="range"
                    min={areaRange.min}
                    max={areaRange.max}
                    step={areaRange.step}
                    value={area}
                    onChange={(event) => setArea(Number(event.target.value))}
                    className="calc-range w-full cursor-pointer appearance-none rounded-full bg-border/70 accent-primary"
                    style={buildRangeStyle(area, areaRange.min, areaRange.max)}
                  />
                </div>

                <div className="rounded-[22px] border border-border/70 bg-background/80 p-4 text-sm text-muted-foreground">
                  {isBn
                    ? `আনুমানিক মাসিক ব্যবহার: প্রায় ${estimatedMonthlyKwh.toFixed(0)} kWh`
                    : `Estimated monthly usage: about ${estimatedMonthlyKwh.toFixed(0)} kWh`}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    trackEvent("calculator_start", { language, bill, area });
                    setStep(2);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110"
                >
                  {labels.cta}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : !submittedSession ? (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 grid gap-10 p-8 sm:p-12 lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary/78">
                {labels.resultsEyebrow}
              </span>
              <h3 className="max-w-[12ch] font-display text-3xl leading-[0.95] tracking-[-0.04em] text-foreground sm:text-5xl">
                {labels.resultsHeadline}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                {labels.resultsBody}
              </p>

              <div className="mt-8 space-y-4">
                <ResultCard
                  label={labels.monthlySavings}
                  value={`৳${model.monthlySavingsBdtRange.low.toLocaleString()} - ৳${model.monthlySavingsBdtRange.high.toLocaleString()}`}
                  accent
                />

                {/* Demand-charge breakdown toggle (Manus synthesis) */}
                <div className="rounded-[20px] border border-border/70 bg-secondary/15 p-4 text-xs">
                  <button
                    type="button"
                    onClick={() => setShowDemandDetail((prev) => !prev)}
                    className="flex w-full items-center justify-between font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                      {labels.demandDetailToggle}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {showDemandDetail ? "−" : "+"}
                    </span>
                  </button>

                  {showDemandDetail ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 space-y-2 border-t border-border/60 pt-3 text-muted-foreground"
                    >
                      <div className="flex justify-between">
                        <span>Energy offset:</span>
                        <span className="font-mono font-medium text-foreground">৳{model.energySavingsBdt.toLocaleString()} / mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{labels.demandSavings}:</span>
                        <span className="font-mono font-medium text-foreground">৳{model.demandChargeSavingsBdt.toLocaleString()} / mo</span>
                      </div>
                      <div className="flex justify-between border-t border-border/40 pt-1 font-semibold text-foreground">
                        <span>{labels.totalValue}:</span>
                        <span className="font-mono text-primary">৳{model.totalEstimatedMonthlyValueBdt.toLocaleString()} / mo</span>
                      </div>
                      <p className="pt-2 text-[10px] leading-relaxed text-muted-foreground/80">
                        {model.netMeteringExportNotice}
                      </p>
                    </motion.div>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ResultCard
                    label={labels.systemSize}
                    value={`${model.systemKwpRange.low} - ${model.systemKwpRange.high} kWp`}
                  />
                  <ResultCard
                    label={labels.annualGeneration}
                    value={`${model.annualGenerationKwh.toLocaleString()} kWh`}
                  />
                </div>
                <ResultCard
                  label={labels.twentyYearValue}
                  value={`৳${model.ppaTermSavingsBdtRange.low.toLocaleString()} - ৳${model.ppaTermSavingsBdtRange.high.toLocaleString()}`}
                />
                 <ResultCard
                  label={labels.co2Saved}
                  value={`${model.co2SavedTonnes.toLocaleString()} ${isBn ? "টন" : "tonnes"}`}
                />
                <div className="rounded-[22px] border border-border/70 bg-secondary/24 p-5">
                  <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {labels.assumptions}
                  </div>
                  <div className="space-y-2 text-sm leading-6 text-muted-foreground">
                    {model.assumptions.map((assumption) => (
                      <p key={assumption}>{assumption}</p>
                    ))}
                    <p className="pt-2 text-foreground/70">{model.disclaimer}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-border/70 bg-secondary/25 p-6 sm:p-8">
              <h4 className="text-2xl font-medium tracking-[-0.03em] text-foreground">
                {labels.contactHeadline}
              </h4>
              <p className="mb-6 mt-3 text-sm leading-6 text-muted-foreground">
                {labels.contactBody}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Optional private bill draft drawer (Manus synthesis) */}
                <div className="rounded-[18px] border border-border/70 bg-background/60 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                        {labels.billDraftTitle}
                      </p>
                      <p className="mt-1 text-[11px] leading-normal text-muted-foreground">
                        {labels.billDraftBody}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="bill-draft-period" className="sr-only">
                        {isBn ? "বিলিং পিরিয়ড" : "Billing period"}
                      </label>
                      <input
                        id="bill-draft-period"
                        type="text"
                        aria-label={isBn ? "বিলিং পিরিয়ড" : "Billing period"}
                        placeholder={isBn ? "বিলিং পিরিয়ড (যেমন 2026-04)" : "Billing period (e.g. 2026-04)"}
                        value={billDraft.billingPeriod}
                        onChange={(e) =>
                          setBillDraft((d) => ({
                            ...d,
                            billingPeriod: e.target.value,
                            publicId: d.publicId || `draft-${Date.now().toString(36)}`,
                          }))
                        }
                        className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="bill-draft-demand" className="sr-only">
                        {isBn ? "বিল্ড ডিমান্ড kVA" : "Billed demand kVA"}
                      </label>
                      <input
                        id="bill-draft-demand"
                        type="number"
                        aria-label={isBn ? "বিল্ড ডিমান্ড kVA" : "Billed demand kVA"}
                        placeholder={isBn ? "বিল্ড ডিমান্ড kVA" : "Billed demand kVA"}
                        value={billDraft.billingDemandKva}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBillDraft((d) => ({ ...d, billingDemandKva: val }));
                          if (val && Number(val) > 0) setPeakDemandKva(Number(val));
                        }}
                        className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2">
                    <input
                      id="billDraftConfirm"
                      type="checkbox"
                      checked={billDraft.confirmedByUser}
                      onChange={(e) =>
                        setBillDraft((d) => ({
                          ...d,
                          confirmedByUser: e.target.checked,
                          publicId: d.publicId || `draft-${Date.now().toString(36)}`,
                        }))
                      }
                      className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary/20"
                    />
                    <label
                      htmlFor="billDraftConfirm"
                      className="text-[11px] font-medium text-foreground/80 cursor-pointer"
                    >
                      {labels.billDraftConfirm}
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="calculator-name" className="mb-2 block text-sm font-medium text-foreground">
                    {labels.name}
                  </label>
                  <input
                    id="calculator-name"
                    required
                    type="text"
                    autoComplete="name"
                    value={formState.name}
                    onChange={(event) => {
                      setFormState((state) => ({ ...state, name: event.target.value }));
                      setErrors((state) => ({ ...state, name: undefined }));
                    }}
                    className={inputCls(Boolean(errors.name))}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "calculator-name-error" : undefined}
                  />
                  {errors.name ? (
                    <p id="calculator-name-error" className="mt-2 text-xs text-destructive">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="calculator-phone" className="mb-2 block text-sm font-medium text-foreground">
                    {labels.phone}
                  </label>
                  <input
                    id="calculator-phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={formState.phone}
                    onChange={(event) => {
                      setFormState((state) => ({ ...state, phone: event.target.value }));
                      setErrors((state) => ({ ...state, phone: undefined }));
                    }}
                    className={inputCls(Boolean(errors.phone))}
                    aria-invalid={errors.phone ? "true" : "false"}
                    aria-describedby={errors.phone ? "calculator-phone-error" : undefined}
                  />
                  {errors.phone ? (
                    <p id="calculator-phone-error" className="mt-2 text-xs text-destructive">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="calculator-address" className="mb-2 block text-sm font-medium text-foreground">
                    {labels.address}
                  </label>
                  <input
                    id="calculator-address"
                    type="text"
                    autoComplete="street-address"
                    value={formState.address}
                    onChange={(event) => setFormState((state) => ({ ...state, address: event.target.value }))}
                    className={inputCls(false)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition-colors hover:bg-primary disabled:opacity-70"
                >
                  {submitting ? labels.sending : labels.continueWhatsApp}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 p-12 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">{labels.doneHeadline}</h2>
            <p className="mx-auto mb-8 mt-4 max-w-xl text-muted-foreground">
              {labels.doneBody}
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <StartAssessmentLink
                source="calculator-success"
                sessionId={submittedSession.id}
                className="w-full sm:w-auto"
              />
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setSubmittedSession(null);
                  setFormState(initialFormState);
                }}
                className="font-medium text-primary hover:underline"
              >
                {labels.startOver}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
  accent?: boolean;
}

function ResultCard({ label, value, accent = false }: ResultCardProps) {
  return (
    <div
      className={cn(
        "rounded-[22px] border p-5 transition-all",
        accent ? "border-primary/25 bg-primary/[0.08]" : "border-border/70 bg-secondary/24",
      )}
    >
      <div className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      <div
        className={cn(
          "text-2xl font-display tracking-[-0.04em]",
          accent ? "text-primary font-bold" : "text-foreground",
        )}
      >
        {value}
      </div>
    </div>
  );
}

const inputCls = (hasError: boolean) =>
  `w-full rounded-2xl border bg-background/88 px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
    hasError ? "border-destructive" : "border-border/70"
  }`;
