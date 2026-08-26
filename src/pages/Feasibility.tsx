import { cloneElement, isValidElement, ReactNode, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { StartAssessmentLink } from "@/components/AssessmentCtas";
import { SEO } from "@/components/SEO";
import { useLanguage } from "@/lib/i18n";
import {
  createAssessmentSessionPayload,
  type AssessmentEvidence,
  type FeasibilityFormValues,
  type StartAssessmentSessionResponse,
  bdPhoneRegex,
} from "@/lib/lead-types";
import {
  AssessmentBackendUnavailableError,
  startAssessmentSession,
} from "@/lib/lead-service";
import { isSupabaseBrowserConfigured } from "@/lib/supabase-client";
import { useSiteCopy } from "@/lib/site-copy";
import { buildWhatsAppStartUrl, isWhatsAppConfigured } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type FallbackFormState = Omit<FeasibilityFormValues, "monthlyBillAmount"> & {
  monthlyBillAmount: string;
  billPhotoReady: "yes" | "no";
  rooftopPhotosReady: "yes" | "no";
};

const inputCls = (hasError: boolean) =>
  `w-full rounded-2xl border bg-input/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-primary focus:bg-input focus:ring-2 focus:ring-primary/20 ${
    hasError ? "border-destructive" : "border-border"
  }`;

const Feasibility = () => {
  const { language } = useLanguage();
  const copy = useSiteCopy();
  const isBn = language === "bn";
  const assessmentBackendConfigured = isSupabaseBrowserConfigured();
  const whatsappConfigured = isWhatsAppConfigured();
  const [values, setValues] = useState<FallbackFormState>({
    preferredLanguage: language,
    name: "",
    phone: "",
    address: "",
    district: "",
    neighborhood: "",
    propertyType: "",
    ownershipStatus: "",
    roofSize: "",
    roofAccessReadiness: "",
    shadingStatus: "",
    targetInstallTimeline: "",
    primaryGoal: "",
    monthlyBillRange: "",
    monthlyBillAmount: "",
    servicePhase: "unknown",
    billPhotoReady: "no",
    rooftopPhotosReady: "no",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedSession, setSubmittedSession] =
    useState<StartAssessmentSessionResponse["session"] | null>(null);
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const firstErrorRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValues((current) => ({ ...current, preferredLanguage: language }));
  }, [language]);

  const options = useMemo(
    () =>
      isBn
        ? {
            propertyTypes: [
              "একক পরিবারিক বাড়ি",
              "অ্যাপার্টমেন্ট বিল্ডিং",
              "বাণিজ্যিক ভবন",
              "ইন্ডাস্ট্রিয়াল / ওয়্যারহাউস",
              "অন্যান্য",
            ],
            ownership: [
              "মালিক",
              "প্রপার্টির সিদ্ধান্তগ্রহণকারী",
              "পরিবারের প্রতিনিধি",
              "ভাড়াটিয়া / সিদ্ধান্তগ্রহণকারী নই",
            ],
            roofSize: [
              "৫০০ বর্গফুটের নিচে",
              "৫০০–১,০০০ বর্গফুট",
              "১,০০০–২,০০০ বর্গফুট",
              "২,০০০–৫,০০০ বর্গফুট",
              "৫,০০০ বর্গফুটের বেশি",
            ],
            monthlyBill: [
              "৩,০০০ টাকার নিচে",
              "৩,০০০–৭,০০০ টাকা",
              "৭,০০০–১৫,০০০ টাকা",
              "১৫,০০০–৩০,০০০ টাকা",
              "৩০,০০০ টাকার বেশি",
            ],
            roofAccess: [
              "এখনই প্রস্তুত",
              "বিল্ডিং স্টাফের সমন্বয় লাগবে",
              "এখনও নিশ্চিত নই",
            ],
            shading: [
              "বেশিরভাগ পরিষ্কার",
              "আংশিক ছায়াযুক্ত",
              "খুব বেশি ছায়াযুক্ত",
              "এখনও নিশ্চিত নই",
            ],
            timeline: [
              "১ মাসের মধ্যে",
              "৩ মাসের মধ্যে",
              "৬ মাসের মধ্যে",
              "শুধু খোঁজ নিচ্ছি",
            ],
            goals: [
              "দিনের বিদ্যুৎ খরচ কমানো",
              "ব্যাকআপ প্রস্তুতি বাড়ানো",
              "ছাদটি উপযুক্ত কি না বোঝা",
              "ভবিষ্যৎ প্রজেক্টের জন্য প্রস্তুতি নেওয়া",
            ],
            phase: [
              { value: "unknown", label: "জানি না" },
              { value: "single_phase", label: "সিঙ্গেল ফেজ" },
              { value: "three_phase", label: "থ্রি ফেজ" },
            ],
            labels: {
              name: "আপনার নাম",
              phone: "ফোন (বাংলাদেশ)",
              address: "ঠিকানা",
              district: "জেলা",
              neighborhood: "এলাকা",
              propertyType: "ভবনের ধরন",
              ownershipStatus: "মালিকানা / সিদ্ধান্তগ্রহণকারী অবস্থা",
              monthlyBillRange: "মাসিক বিদ্যুৎ বিল",
              monthlyBillAmount: "সঠিক বিলের পরিমাণ (ঐচ্ছিক)",
              roofSize: "ছাদের আকার",
              roofAccessReadiness: "ছাদে অ্যাক্সেস",
              shadingStatus: "ছায়া",
              targetInstallTimeline: "সময়সীমা",
              primaryGoal: "মূল লক্ষ্য",
              servicePhase: "সংযোগ ফেজ (ঐচ্ছিক)",
              billPhotoReady: "আপনার কাছে কি এখন বিলের ছবি আছে?",
              rooftopPhotosReady: "আপনার কাছে কি এখন ছাদের ছবি আছে?",
            },
            errors: copy.feasibility.validation,
            success: copy.feasibility.successTitle,
            submittedNote: copy.feasibility.successBody,
          }
        : {
            propertyTypes: [
              "Single-family home",
              "Apartment building",
              "Commercial building",
              "Industrial / warehouse",
              "Other",
            ],
            ownership: [
              "Owner",
              "Decision maker for the property",
              "Family representative",
              "Tenant / not the decision maker",
            ],
            roofSize: [
              "Under 500 sq ft",
              "500–1,000 sq ft",
              "1,000–2,000 sq ft",
              "2,000–5,000 sq ft",
              "Over 5,000 sq ft",
            ],
            monthlyBill: [
              "Under BDT 3,000",
              "BDT 3,000–7,000",
              "BDT 7,000–15,000",
              "BDT 15,000–30,000",
              "Over BDT 30,000",
            ],
            roofAccess: [
              "Ready now",
              "Needs coordination with building staff",
              "Not sure yet",
            ],
            shading: ["Mostly clear", "Partly shaded", "Heavily shaded", "Not sure yet"],
            timeline: [
              "Within 1 month",
              "Within 3 months",
              "Within 6 months",
              "Just exploring",
            ],
            goals: [
              "Reduce daytime electricity cost",
              "Improve backup readiness",
              "Understand whether the roof is a fit",
              "Prepare for a future project",
            ],
            phase: [
              { value: "unknown", label: "Don't know" },
              { value: "single_phase", label: "Single phase" },
              { value: "three_phase", label: "Three phase" },
            ],
            labels: {
              name: "Your name",
              phone: "Phone (Bangladesh)",
              address: "Address",
              district: "District",
              neighborhood: "Neighborhood",
              propertyType: "Building type",
              ownershipStatus: "Ownership / decision-maker status",
              monthlyBillRange: "Monthly electricity bill",
              monthlyBillAmount: "Exact bill amount (optional)",
              roofSize: "Roof size",
              roofAccessReadiness: "Roof access",
              shadingStatus: "Shading",
              targetInstallTimeline: "Timeline",
              primaryGoal: "Primary goal",
              servicePhase: "Connection phase (optional)",
              billPhotoReady: "Do you already have a bill photo?",
              rooftopPhotosReady: "Do you already have rooftop photos?",
            },
            errors: copy.feasibility.validation,
            success: copy.feasibility.successTitle,
            submittedNote: copy.feasibility.successBody,
          },
    [isBn],
  );

  const update = (key: keyof FallbackFormState, value: string) => {
    setValues((state) => ({ ...state, [key]: value }));
    setErrors((state) => ({ ...state, [key]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (values.name.trim().length < 2) nextErrors.name = options.errors.name;
    if (!bdPhoneRegex.test(values.phone.trim())) nextErrors.phone = options.errors.phone;
    if (values.address.trim().length < 5) nextErrors.address = options.errors.address;
    if (values.district.trim().length < 2) nextErrors.district = options.errors.district;
    if (values.neighborhood.trim().length < 2)
      nextErrors.neighborhood = options.errors.neighborhood;

    [
      "propertyType",
      "ownershipStatus",
      "monthlyBillRange",
      "roofSize",
      "roofAccessReadiness",
      "shadingStatus",
      "targetInstallTimeline",
      "primaryGoal",
    ].forEach((field) => {
      if (!values[field as keyof FallbackFormState]) {
        nextErrors[field] = options.errors.required;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildEvidence = (): AssessmentEvidence[] => {
    const evidence: AssessmentEvidence[] = [];

    if (values.billPhotoReady === "yes") {
      evidence.push({
        kind: "electric_bill",
        captureChannel: "web_form",
        status: "pending_review",
        note:
          language === "bn"
            ? "গ্রাহক জানিয়েছেন bill photo প্রস্তুত আছে; WhatsApp-এ continue করলে শেয়ার করা যাবে।"
            : "Customer indicated that a recent bill photo is ready and can be shared in WhatsApp.",
        metadata: { declaredReady: true },
      });
    }

    if (values.rooftopPhotosReady === "yes") {
      evidence.push({
        kind: "roof_photo",
        captureChannel: "web_form",
        status: "pending_review",
        note:
          language === "bn"
            ? "গ্রাহক জানিয়েছেন rooftop photo প্রস্তুত আছে; WhatsApp-এ continue করলে শেয়ার করা যাবে।"
            : "Customer indicated that rooftop photos are ready and can be shared in WhatsApp.",
        metadata: { declaredReady: true },
      });
    }

    return evidence;
  };

  const buildManualWhatsAppDetails = () => {
    const details = [
      `name=${values.name.trim() || (isBn ? "চ্যাটে জানাবো" : "to share in chat")}`,
      `phone=${values.phone.trim()}`,
      `district=${values.district.trim()}`,
      `area=${values.neighborhood.trim()}`,
      `type=${values.propertyType}`,
      `bill=${values.monthlyBillRange}`,
      `roof=${values.roofSize}`,
      `timeline=${values.targetInstallTimeline}`,
    ];

    return details.filter((detail) => !detail.endsWith("="));
  };

  const focusFirstError = () => {
    if (firstErrorRef.current) {
      firstErrorRef.current.focus();
      firstErrorRef.current = null;
    } else {
      const firstError = document.querySelector('[aria-invalid="true"]') as HTMLElement;
      firstError?.focus();
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmissionAttempted(true);

    if (!validate()) {
      toast.error(options.errors.generic);
      focusFirstError();
      return;
    }

    setSubmitting(true);

    try {
      const payload = createAssessmentSessionPayload({
        entryPoint: "web_feasibility",
        preferredLanguage: values.preferredLanguage,
        routeSource: "fallback_form",
        contact: {
          name: values.name,
          phone: values.phone,
          preferredChannel: "whatsapp",
        },
        answers: {
          address: values.address,
          district: values.district,
          neighborhood: values.neighborhood,
          propertyType: values.propertyType,
          buildingType: values.propertyType,
          ownershipStatus: values.ownershipStatus,
          roofSizeBand: values.roofSize,
          roofAccessReadiness: values.roofAccessReadiness,
          shadingStatus: values.shadingStatus,
          targetInstallTimeline: values.targetInstallTimeline,
          primaryGoal: values.primaryGoal,
          monthlyBillBand: values.monthlyBillRange,
          monthlyBillAmount: values.monthlyBillAmount
            ? Number(values.monthlyBillAmount)
            : undefined,
          servicePhase: values.servicePhase,
          notes: "Fallback web form submission.",
        },
        evidence: buildEvidence(),
      });

      const result = await startAssessmentSession(payload);
      setSubmittedSession(result.session);
      toast.success(options.success);
    } catch (error) {
      if (error instanceof AssessmentBackendUnavailableError && whatsappConfigured && typeof window !== "undefined") {
        window.location.assign(
          buildWhatsAppStartUrl({
            language,
            source: "fallback_form_manual",
            details: buildManualWhatsAppDetails(),
          }),
        );
        return;
      }

      toast.error(
        error instanceof Error
          ? error.message
          : isBn
            ? "এই মুহূর্তে ফিজিবিলিটি রিকোয়েস্ট জমা দেওয়া যাচ্ছে না।"
            : "Unable to submit the feasibility request right now.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Prevent duplicate submissions on page refresh
  useEffect(() => {
    if (submittedSession) {
      sessionStorage.setItem("feasibility_submitted", "true");
    }
  }, [submittedSession]);

  if (submittedSession) {
    return (
      <>
        <SEO path="/feasibility" />
        <section className="flex min-h-[80vh] items-center pb-32 pt-40 md:pb-44 md:pt-52">
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h1 className="display-text text-4xl text-balance md:text-6xl">
                {copy.feasibility.successTitle}
              </h1>
              <p className="mt-4 max-w-xl mx-auto text-lg leading-relaxed text-foreground/72">
                {copy.feasibility.successBody}
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <StartAssessmentLink
                  source="feasibility_success"
                  className="w-full max-w-xs justify-center px-6 py-3 text-base shadow-[0_18px_36px_-24px_rgba(200,178,255,0.72)]"
                >
                  {options.submitAnother}
                </StartAssessmentLink>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO path="/feasibility" />
      <section className="flex min-h-[80vh] items-center pb-32 pt-40 md:pb-44 md:pt-52">
        <div className="container-tight">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 md:mb-16 text-center"
            >
              <p className="eyebrow mb-4 text-primary/80">{copy.feasibility.eyebrow}</p>
              <h1 className="display-xl max-w-[11ch] text-balance text-foreground md:display-text">
                {copy.feasibility.headline}
              </h1>
              <p className="mt-4 max-w-[30rem] mx-auto text-base leading-8 text-foreground/72 md:max-w-none md:text-xl md:leading-relaxed">
                {copy.feasibility.body}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] border border-border/60 bg-background p-6 md:p-10 shadow-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" noValidate>
                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {options.labels.name}
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={inputCls(!!errors.name)}
                      placeholder={options.labels.name}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      disabled={submitting}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-destructive" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      {options.labels.phone}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value.replace(/[^\d+]/g, ""))}
                      className={inputCls(!!errors.phone)}
                      placeholder="01XXXXXXXXX"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      disabled={submitting}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-sm text-destructive" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium text-foreground">
                    {options.labels.address}
                  </label>
                  <input
                    id="address"
                    type="text"
                    autoComplete="street-address"
                    value={values.address}
                    onChange={(e) => update("address", e.target.value)}
                    className={inputCls(!!errors.address)}
                    placeholder="House/road/block, area"
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? "address-error" : undefined}
                    disabled={submitting}
                  />
                  {errors.address && (
                    <p id="address-error" className="text-sm text-destructive" role="alert">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="district" className="text-sm font-medium text-foreground">
                      {options.labels.district}
                    </label>
                    <input
                      id="district"
                      type="text"
                      autoComplete="address-level2"
                      value={values.district}
                      onChange={(e) => update("district", e.target.value)}
                      className={inputCls(!!errors.district)}
                      placeholder="e.g. Dhaka"
                      aria-invalid={!!errors.district}
                      aria-describedby={errors.district ? "district-error" : undefined}
                      disabled={submitting}
                    />
                    {errors.district && (
                      <p id="district-error" className="text-sm text-destructive" role="alert">
                        {errors.district}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="neighborhood" className="text-sm font-medium text-foreground">
                      {options.labels.neighborhood}
                    </label>
                    <input
                      id="neighborhood"
                      type="text"
                      autoComplete="address-level3"
                      value={values.neighborhood}
                      onChange={(e) => update("neighborhood", e.target.value)}
                      className={inputCls(!!errors.neighborhood)}
                      placeholder="e.g. Gulshan"
                      aria-invalid={!!errors.neighborhood}
                      aria-describedby={errors.neighborhood ? "neighborhood-error" : undefined}
                      disabled={submitting}
                    />
                    {errors.neighborhood && (
                      <p id="neighborhood-error" className="text-sm text-destructive" role="alert">
                        {errors.neighborhood}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="propertyType" className="text-sm font-medium text-foreground">
                      {options.labels.propertyType}
                    </label>
                    <select
                      id="propertyType"
                      value={values.propertyType}
                      onChange={(e) => update("propertyType", e.target.value)}
                      className={inputCls(!!errors.propertyType)}
                      aria-invalid={!!errors.propertyType}
                      aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
                      disabled={submitting}
                    >
                      <option value="">{options.labels.propertyType}</option>
                      {options.propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.propertyType && (
                      <p id="propertyType-error" className="text-sm text-destructive" role="alert">
                        {errors.propertyType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="ownershipStatus" className="text-sm font-medium text-foreground">
                      {options.labels.ownershipStatus}
                    </label>
                    <select
                      id="ownershipStatus"
                      value={values.ownershipStatus}
                      onChange={(e) => update("ownershipStatus", e.target.value)}
                      className={inputCls(!!errors.ownershipStatus)}
                      aria-invalid={!!errors.ownershipStatus}
                      aria-describedby={errors.ownershipStatus ? "ownershipStatus-error" : undefined}
                      disabled={submitting}
                    >
                      <option value="">{options.labels.ownershipStatus}</option>
                      {options.ownership.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.ownershipStatus && (
                      <p id="ownershipStatus-error" className="text-sm text-destructive" role="alert">
                        {errors.ownershipStatus}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="monthlyBillRange" className="text-sm font-medium text-foreground">
                      {options.labels.monthlyBillRange}
                    </label>
                    <select
                      id="monthlyBillRange"
                      value={values.monthlyBillRange}
                      onChange={(e) => update("monthlyBillRange", e.target.value)}
                      className={inputCls(!!errors.monthlyBillRange)}
                      aria-invalid={!!errors.monthlyBillRange}
                      aria-describedby={errors.monthlyBillRange ? "monthlyBillRange-error" : undefined}
                      disabled={submitting}
                    >
                      <option value="">{options.labels.monthlyBillRange}</option>
                      {options.monthlyBill.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                    {errors.monthlyBillRange && (
                      <p id="monthlyBillRange-error" className="text-sm text-destructive" role="alert">
                        {errors.monthlyBillRange}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="monthlyBillAmount" className="text-sm font-medium text-foreground">
                      {options.labels.monthlyBillAmount}
                    </label>
                    <input
                      id="monthlyBillAmount"
                      type="text"
                      inputMode="numeric"
                      value={values.monthlyBillAmount}
                      onChange={(e) => update("monthlyBillAmount", e.target.value.replace(/[^\d]/g, ""))}
                      className={inputCls(false)}
                      placeholder="e.g. 5000"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="roofSize" className="text-sm font-medium text-foreground">
                      {options.labels.roofSize}
                    </label>
                    <select
                      id="roofSize"
                      value={values.roofSize}
                      onChange={(e) => update("roofSize", e.target.value)}
                      className={inputCls(!!errors.roofSize)}
                      aria-invalid={!!errors.roofSize}
                      aria-describedby={errors.roofSize ? "roofSize-error" : undefined}
                      disabled={submitting}
                    >
                      <option value="">{options.labels.roofSize}</option>
                      {options.roofSize.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    {errors.roofSize && (
                      <p id="roofSize-error" className="text-sm text-destructive" role="alert">
                        {errors.roofSize}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="roofAccessReadiness" className="text-sm font-medium text-foreground">
                      {options.labels.roofAccessReadiness}
                    </label>
                    <select
                      id="roofAccessReadiness"
                      value={values.roofAccessReadiness}
                      onChange={(e) => update("roofAccessReadiness", e.target.value)}
                      className={inputCls(!!errors.roofAccessReadiness)}
                      aria-invalid={!!errors.roofAccessReadiness}
                      aria-describedby={errors.roofAccessReadiness ? "roofAccessReadiness-error" : undefined}
                      disabled={submitting}
                    >
                      <option value="">{options.labels.roofAccessReadiness}</option>
                      {options.roofAccess.map((access) => (
                        <option key={access} value={access}>
                          {access}
                        </option>
                      ))}
                    </select>
                    {errors.roofAccessReadiness && (
                      <p id="roofAccessReadiness-error" className="text-sm text-destructive" role="alert">
                        {errors.roofAccessReadiness}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="shadingStatus" className="text-sm font-medium text-foreground">
                      {options.labels.shadingStatus}
                    </label>
                    <select
                      id="shadingStatus"
                      value={values.shadingStatus}
                      onChange={(e) => update("shadingStatus", e.target.value)}
                      className={inputCls(!!errors.shadingStatus)}
                      aria-invalid={!!errors.shadingStatus}
                      aria-describedby={errors.shadingStatus ? "shadingStatus-error" : undefined}
                      disabled={submitting}
                    >
                      <option value="">{options.labels.shadingStatus}</option>
                      {options.shading.map((shading) => (
                        <option key={shading} value={shading}>
                          {shading}
                        </option>
                      ))}
                    </select>
                    {errors.shadingStatus && (
                      <p id="shadingStatus-error" className="text-sm text-destructive" role="alert">
                        {errors.shadingStatus}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="targetInstallTimeline" className="text-sm font-medium text-foreground">
                      {options.labels.targetInstallTimeline}
                    </label>
                    <select
                      id="targetInstallTimeline"
                      value={values.targetInstallTimeline}
                      onChange={(e) => update("targetInstallTimeline", e.target.value)}
                      className={inputCls(!!errors.targetInstallTimeline)}
                      aria-invalid={!!errors.targetInstallTimeline}
                      aria-describedby={errors.targetInstallTimeline ? "targetInstallTimeline-error" : undefined}
                      disabled={submitting}
                    >
                      <option value="">{options.labels.targetInstallTimeline}</option>
                      {options.timeline.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                    {errors.targetInstallTimeline && (
                      <p id="targetInstallTimeline-error" className="text-sm text-destructive" role="alert">
                        {errors.targetInstallTimeline}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="primaryGoal" className="text-sm font-medium text-foreground">
                    {options.labels.primaryGoal}
                  </label>
                  <select
                    id="primaryGoal"
                    value={values.primaryGoal}
                    onChange={(e) => update("primaryGoal", e.target.value)}
                    className={inputCls(!!errors.primaryGoal)}
                    aria-invalid={!!errors.primaryGoal}
                    aria-describedby={errors.primaryGoal ? "primaryGoal-error" : undefined}
                    disabled={submitting}
                  >
                    <option value="">{options.labels.primaryGoal}</option>
                    {options.goals.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>
                  {errors.primaryGoal && (
                    <p id="primaryGoal-error" className="text-sm text-destructive" role="alert">
                      {errors.primaryGoal}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="servicePhase" className="text-sm font-medium text-foreground">
                    {options.labels.servicePhase}
                  </label>
                  <select
                    id="servicePhase"
                    value={values.servicePhase}
                    onChange={(e) => update("servicePhase", e.target.value)}
                    className={inputCls(false)}
                    disabled={submitting}
                  >
                    {options.phase.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 md:grid-cols-2 md:gap-6 pt-4 border-t border-border/60">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        id="billPhotoReady"
                        type="checkbox"
                        checked={values.billPhotoReady === "yes"}
                        onChange={(e) =>
                          update("billPhotoReady", e.target.checked ? "yes" : "no")
                        }
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                        disabled={submitting}
                      />
                      <label htmlFor="billPhotoReady" className="text-sm font-medium text-foreground cursor-pointer">
                        {options.labels.billPhotoReady}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        id="rooftopPhotosReady"
                        type="checkbox"
                        checked={values.rooftopPhotosReady === "yes"}
                        onChange={(e) =>
                          update("rooftopPhotosReady", e.target.checked ? "yes" : "no")
                        }
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                        disabled={submitting}
                      />
                      <label htmlFor="rooftopPhotosReady" className="text-sm font-medium text-foreground cursor-pointer">
                        {options.labels.rooftopPhotosReady}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      "w-full rounded-2xl bg-primary px-6 py-4 text-base font-medium text-primary-foreground shadow-sun hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
                      submitting && "cursor-wait",
                    )}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                        {isBn ? "জমা দেওয়া হচ্ছে..." : "Submitting..."}
                      </>
                    ) : (
                      options.submit
                    )}
                  </button>
                </div>

                <div className="pt-2 text-center text-sm text-muted-foreground">
                  {options.errors.generic}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feasibility;