import { cloneElement, isValidElement, ReactNode, FormEvent, useEffect, useMemo, useState } from "react";
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
            shading: ["বেশিরভাগ পরিষ্কার", "আংশিক ছায়াযুক্ত", "খুব বেশি ছায়াযুক্ত", "এখনও নিশ্চিত নই"],
            timeline: ["১ মাসের মধ্যে", "৩ মাসের মধ্যে", "৬ মাসের মধ্যে", "শুধু খোঁজ নিচ্ছি"],
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
            errors: {
              name: "দয়া করে আপনার নাম লিখুন।",
              phone: "একটি বৈধ বাংলাদেশি নম্বর দিন (যেমন 01XXXXXXXXX)।",
              generic: "দয়া করে হাইলাইট করা ফিল্ডগুলো ঠিক করুন।",
              address: "দয়া করে পূর্ণ ঠিকানা লিখুন।",
              district: "দয়া করে আপনার জেলা লিখুন।",
              neighborhood: "দয়া করে আপনার এলাকা লিখুন।",
              required: "দয়া করে এই ফিল্ডটি পূরণ করুন।",
            },
            success: "ফিজিবিলিটি রিকোয়েস্ট গ্রহণ করা হয়েছে।",
            submittedNote:
              "আপনি যে তথ্য দিয়েছেন সেখান থেকেই আমরা এগোবো, প্রয়োজন হলে বাকি তথ্য চাওয়া হবে।",
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
            timeline: ["Within 1 month", "Within 3 months", "Within 6 months", "Just exploring"],
            goals: [
              "Reduce daytime electricity cost",
              "Improve backup readiness",
              "Understand whether the roof is a fit",
              "Prepare for a future project",
            ],
            phase: [
              { value: "unknown", label: "Don’t know" },
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
            errors: {
              name: "Please enter your name.",
              phone: "Enter a valid Bangladesh number (e.g. 01XXXXXXXXX).",
              generic: "Please fix the highlighted fields.",
              address: "Please enter a full address.",
              district: "Please enter your district.",
              neighborhood: "Please enter your neighborhood.",
              required: "Please complete this field.",
            },
            success: "Feasibility request received.",
            submittedNote:
              "We'll continue from the details you've shared and request anything missing if needed.",
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
    if (values.neighborhood.trim().length < 2) nextErrors.neighborhood = options.errors.neighborhood;

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      toast.error(options.errors.generic);
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
          notes:
            "Fallback web form submission.",
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
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {copy.feasibility.successBody}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{options.submittedNote}</p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {whatsappConfigured ? (
                  <StartAssessmentLink
                    source="fallback-success"
                    sessionId={submittedSession.id}
                    className="w-full sm:w-auto"
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedSession(null);
                    setValues((current) => ({
                      ...current,
                      name: "",
                      phone: "",
                      address: "",
                      district: "",
                      neighborhood: "",
                    }));
                  }}
                  className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                >
                  {copy.feasibility.submitAnother}
                </button>
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

      <section className="relative pb-12 pt-40 md:pb-16 md:pt-52">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-45" />
        <div className="container-tight">
          <p className="eyebrow mb-6 text-primary/80">{copy.feasibility.eyebrow}</p>
          <h1 className="display-text max-w-4xl text-5xl text-balance md:text-7xl">
            {copy.feasibility.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {copy.feasibility.body}
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-tight grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="ivory-panel rounded-[2rem] p-8 md:p-10">
            <p className="eyebrow mb-4 text-primary/80">{copy.feasibility.whatsappHeadline}</p>
            <h2 className="font-display text-3xl tracking-[-0.04em] text-foreground">
              {copy.common.startAssessment}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {copy.feasibility.whatsappBody}
            </p>
            <div className="mt-8">
              <StartAssessmentLink source="fallback-page-top" />
            </div>
          </div>

          <div className="ivory-panel rounded-[2rem] p-8 md:p-10">
            <p className="eyebrow mb-4 text-primary/80">{copy.feasibility.fallbackHeadline}</p>
            <p className="text-base leading-7 text-muted-foreground">
              {copy.feasibility.fallbackBody}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-32 md:pb-40">
        <div className="container-tight max-w-5xl">
          {!assessmentBackendConfigured ? (
            <div className="ivory-panel rounded-[2rem] p-8 md:p-10">
              <p className="eyebrow mb-4 text-primary/80">{copy.feasibility.fallbackHeadline}</p>
              <h2 className="font-display text-3xl tracking-[-0.04em] text-foreground">
                {isBn ? "হোয়াটসঅ্যাপে চালিয়ে যান" : "Continue on WhatsApp"}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                {isBn
                  ? "ওয়েব ফলব্যাক ফর্মটি আপাতত উপলভ্য নয়। হোয়াটসঅ্যাপে চালিয়ে যান, NETSO সেখানেই পরের ইনটেক তথ্য সংগ্রহ করবে।"
                  : "The web fallback form is temporarily unavailable. Continue on WhatsApp and NETSO will collect the next intake details there."}
              </p>
              {whatsappConfigured ? (
                <div className="mt-8">
                  <StartAssessmentLink source="fallback-form-unavailable" />
                </div>
              ) : null}
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup label={options.labels.name} error={errors.name} htmlFor="name">
                <input
                  id="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  className={inputCls(Boolean(errors.name))}
                />
              </FieldGroup>

              <FieldGroup label={options.labels.phone} error={errors.phone} htmlFor="phone">
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  className={inputCls(Boolean(errors.phone))}
                />
              </FieldGroup>
            </div>

            <FieldGroup label={options.labels.address} error={errors.address} htmlFor="address">
              <input
                id="address"
                autoComplete="street-address"
                value={values.address}
                onChange={(event) => update("address", event.target.value)}
                className={inputCls(Boolean(errors.address))}
              />
            </FieldGroup>

            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup label={options.labels.district} error={errors.district} htmlFor="district">
                <input
                  id="district"
                  value={values.district}
                  onChange={(event) => update("district", event.target.value)}
                  className={inputCls(Boolean(errors.district))}
                />
              </FieldGroup>

              <FieldGroup
                label={options.labels.neighborhood}
                error={errors.neighborhood}
                htmlFor="neighborhood"
              >
                <input
                  id="neighborhood"
                  value={values.neighborhood}
                  onChange={(event) => update("neighborhood", event.target.value)}
                  className={inputCls(Boolean(errors.neighborhood))}
                />
              </FieldGroup>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup
                label={options.labels.propertyType}
                error={errors.propertyType}
                htmlFor="propertyType"
              >
                <select
                  id="propertyType"
                  value={values.propertyType}
                  onChange={(event) => update("propertyType", event.target.value)}
                  className={inputCls(Boolean(errors.propertyType))}
                >
                  <option value="" />
                  {options.propertyTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup
                label={options.labels.ownershipStatus}
                error={errors.ownershipStatus}
                htmlFor="ownershipStatus"
              >
                <select
                  id="ownershipStatus"
                  value={values.ownershipStatus}
                  onChange={(event) => update("ownershipStatus", event.target.value)}
                  className={inputCls(Boolean(errors.ownershipStatus))}
                >
                  <option value="" />
                  {options.ownership.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldGroup>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup
                label={options.labels.monthlyBillRange}
                error={errors.monthlyBillRange}
                htmlFor="monthlyBillRange"
              >
                <select
                  id="monthlyBillRange"
                  value={values.monthlyBillRange}
                  onChange={(event) => update("monthlyBillRange", event.target.value)}
                  className={inputCls(Boolean(errors.monthlyBillRange))}
                >
                  <option value="" />
                  {options.monthlyBill.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup label={options.labels.monthlyBillAmount} htmlFor="monthlyBillAmount">
                <input
                  id="monthlyBillAmount"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  value={values.monthlyBillAmount}
                  onChange={(event) => update("monthlyBillAmount", event.target.value)}
                  className={inputCls(false)}
                />
              </FieldGroup>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup label={options.labels.roofSize} error={errors.roofSize} htmlFor="roofSize">
                <select
                  id="roofSize"
                  value={values.roofSize}
                  onChange={(event) => update("roofSize", event.target.value)}
                  className={inputCls(Boolean(errors.roofSize))}
                >
                  <option value="" />
                  {options.roofSize.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup
                label={options.labels.servicePhase}
                htmlFor="servicePhase"
              >
                <select
                  id="servicePhase"
                  value={values.servicePhase}
                  onChange={(event) => update("servicePhase", event.target.value)}
                  className={inputCls(false)}
                >
                  {options.phase.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FieldGroup>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup
                label={options.labels.roofAccessReadiness}
                error={errors.roofAccessReadiness}
                htmlFor="roofAccessReadiness"
              >
                <select
                  id="roofAccessReadiness"
                  value={values.roofAccessReadiness}
                  onChange={(event) => update("roofAccessReadiness", event.target.value)}
                  className={inputCls(Boolean(errors.roofAccessReadiness))}
                >
                  <option value="" />
                  {options.roofAccess.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup
                label={options.labels.shadingStatus}
                error={errors.shadingStatus}
                htmlFor="shadingStatus"
              >
                <select
                  id="shadingStatus"
                  value={values.shadingStatus}
                  onChange={(event) => update("shadingStatus", event.target.value)}
                  className={inputCls(Boolean(errors.shadingStatus))}
                >
                  <option value="" />
                  {options.shading.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldGroup>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup
                label={options.labels.targetInstallTimeline}
                error={errors.targetInstallTimeline}
                htmlFor="targetInstallTimeline"
              >
                <select
                  id="targetInstallTimeline"
                  value={values.targetInstallTimeline}
                  onChange={(event) => update("targetInstallTimeline", event.target.value)}
                  className={inputCls(Boolean(errors.targetInstallTimeline))}
                >
                  <option value="" />
                  {options.timeline.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup
                label={options.labels.primaryGoal}
                error={errors.primaryGoal}
                htmlFor="primaryGoal"
              >
                <select
                  id="primaryGoal"
                  value={values.primaryGoal}
                  onChange={(event) => update("primaryGoal", event.target.value)}
                  className={inputCls(Boolean(errors.primaryGoal))}
                >
                  <option value="" />
                  {options.goals.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldGroup>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup label={options.labels.billPhotoReady} htmlFor="billPhotoReady">
                <select
                  id="billPhotoReady"
                  value={values.billPhotoReady}
                  onChange={(event) => update("billPhotoReady", event.target.value)}
                  className={inputCls(false)}
                >
                  <option value="no">{isBn ? "না" : "No"}</option>
                  <option value="yes">{isBn ? "হ্যাঁ" : "Yes"}</option>
                </select>
              </FieldGroup>

              <FieldGroup label={options.labels.rooftopPhotosReady} htmlFor="rooftopPhotosReady">
                <select
                  id="rooftopPhotosReady"
                  value={values.rooftopPhotosReady}
                  onChange={(event) => update("rooftopPhotosReady", event.target.value)}
                  className={inputCls(false)}
                >
                  <option value="no">{isBn ? "না" : "No"}</option>
                  <option value="yes">{isBn ? "হ্যাঁ" : "Yes"}</option>
                </select>
              </FieldGroup>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {language === "bn" ? "জমা দেওয়া হচ্ছে..." : "Submitting..."}
                </>
              ) : (
                copy.feasibility.submit
              )}
            </button>

            <p className="text-xs leading-6 text-muted-foreground">
              {isBn
                ? "জমা দেওয়ার মাধ্যমে আপনি সম্মতি দিচ্ছেন যে NETSO আপনার ছাদ বিষয়ে যোগাযোগ করতে পারবে। আমরা কখনও আপনার তথ্য শেয়ার করি না।"
                : "By submitting, you agree to be contacted by NETSO regarding your rooftop. We never share your details."}
            </p>
          </form>
          )}
        </div>
      </section>
    </>
  );
};

const FieldGroup = ({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) => {
  const describedBy = error ? `${htmlFor}-error` : undefined;
  const enhancedChild = isValidElement(children)
    ? cloneElement(children, {
        "aria-describedby": describedBy,
        "aria-invalid": error ? "true" : "false",
      })
    : children;

  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      {enhancedChild}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Feasibility;
