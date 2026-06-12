import { FormEvent, useMemo, useState } from "react";
import { Calculator, TriangleAlert } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type FormState = {
  bill: string;
  sunHours: string;
  roofSize: string;
  email: string;
};

const GRID_RATE = 10.3;
const NETSO_TARIFF = 7;
const DEFAULT_SUN_HOURS = 5;
const DAILY_SOLAR_YIELD = 1.2;
const DAYS_PER_MONTH = 30;
const AVG_CAPEX_PER_KW = 50000;
const EQUITY_SHARE = 0.2;
const DISCOUNT_RATE = 0.07;

export function SolarCalculatorFunnel() {
  const { language } = useLanguage();
  const isBn = language === "bn";

  const [form, setForm] = useState<FormState>({
    bill: "",
    sunHours: "5.0",
    roofSize: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const parsed = useMemo(() => {
    const bill = Number(form.bill);
    const roofSize = Number(form.roofSize);
    const hasRoof = form.roofSize.trim().length > 0 && Number.isFinite(roofSize) && roofSize > 0;

    if (!Number.isFinite(bill) || bill <= 0) return null;

    const consumption = bill / GRID_RATE;
    const netsoCost = consumption * NETSO_TARIFF;
    const monthlySavings = bill - netsoCost;
    const savingsPct = (monthlySavings / bill) * 100;
    const annualSavings = monthlySavings * 12;

    const expectedGen = hasRoof ? roofSize * DAILY_SOLAR_YIELD * DAYS_PER_MONTH : null;
    const roofMismatch =
      expectedGen !== null ? Math.abs(expectedGen - consumption) / consumption > 0.2 : false;

    const totalCapex = hasRoof ? roofSize * AVG_CAPEX_PER_KW : null;
    const equity = totalCapex ? totalCapex * EQUITY_SHARE : null;
    const monthlyProfit = equity ? monthlySavings - (equity * DISCOUNT_RATE) / 12 : null;
    const paybackMonths =
      equity && monthlyProfit && monthlyProfit > 0 ? Math.ceil(equity / monthlyProfit) : null;

    return {
      bill,
      consumption,
      netsoCost,
      monthlySavings,
      savingsPct,
      annualSavings,
      roofMismatch,
      paybackMonths,
      expectedGen,
    };
  }, [form.bill, form.roofSize]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const bill = Number(form.bill);
    const sunHours = form.sunHours.trim().length ? Number(form.sunHours) : DEFAULT_SUN_HOURS;
    const roofSize = form.roofSize.trim().length ? Number(form.roofSize) : undefined;

    if (!Number.isFinite(bill) || bill <= 0) {
      nextErrors.bill = isBn ? "সঠিক বিল দিন" : "Enter a valid monthly bill";
    }
    if (form.sunHours.trim().length && (!Number.isFinite(sunHours) || sunHours < 1 || sunHours > 12)) {
      nextErrors.sunHours = isBn ? "১–১২ ঘণ্টার মধ্যে দিন" : "Sun hours must be between 1 and 12";
    }
    if (form.roofSize.trim().length && (!Number.isFinite(roofSize) || roofSize <= 0)) {
      nextErrors.roofSize = isBn ? "সঠিক roof size দিন" : "Enter a valid roof size";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = isBn ? "সঠিক ইমেইল দিন" : "Enter a valid email";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !parsed) return;

    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          bill,
          sunHours: form.sunHours.trim().length ? sunHours : undefined,
          roofSize,
        }),
      });

      trackEvent("savings_calc_submitted", {
        language,
        bill,
        sunHours,
        roofSize,
      });

      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="ivory-panel mx-auto w-full max-w-5xl rounded-[32px] border border-border/70 p-8 shadow-[0_24px_70px_rgba(37,23,8,0.08)] sm:p-12">
      <div className="mb-8 flex items-center gap-3 text-primary/80">
        <Calculator className="h-5 w-5" />
        <span className="text-xs font-bold uppercase tracking-[0.2em]">
          {isBn ? "সেভিংস ক্যালকুলেটর" : "Savings calculator"}
        </span>
      </div>

      <h2 className="font-display text-3xl tracking-[-0.04em] sm:text-5xl">
        {isBn ? "৩০ সেকেন্ডে আপনার ছাদের সম্ভাবনা হিসাব করুন।" : "Calculate Your Savings in Seconds"}
      </h2>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <InputField label={isBn ? "গড় মাসিক বিল" : "Current Monthly Electricity Bill (BDT)"} id="calc-bill" error={errors.bill}>
            <input id="calc-bill" type="number" min={1} required value={form.bill} onChange={(e) => setForm((s) => ({ ...s, bill: e.target.value }))} className={inputCls(Boolean(errors.bill))} />
          </InputField>

          <InputField label={isBn ? "Average Daily Sun Hours (optional)" : "Average Daily Sun Hours (optional)"} id="calc-sun-hours" error={errors.sunHours}>
            <input id="calc-sun-hours" type="number" min={1} max={12} step="0.1" value={form.sunHours} onChange={(e) => setForm((s) => ({ ...s, sunHours: e.target.value }))} className={inputCls(Boolean(errors.sunHours))} />
          </InputField>

          <InputField label={isBn ? "Roof Size (kW) (optional)" : "Roof Size (kW) (optional)"} id="calc-roof" error={errors.roofSize}>
            <input id="calc-roof" type="number" min={0.1} step="0.1" value={form.roofSize} onChange={(e) => setForm((s) => ({ ...s, roofSize: e.target.value }))} className={inputCls(Boolean(errors.roofSize))} />
          </InputField>

          <InputField label={isBn ? "Contact Email" : "Contact Email"} id="calc-email" error={errors.email}>
            <input id="calc-email" type="email" required value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} className={inputCls(Boolean(errors.email))} />
          </InputField>

          <button type="submit" disabled={submitting} className="w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-70">
            {submitting ? (isBn ? "পাঠানো হচ্ছে…" : "Submitting…") : isBn ? "সেভিংস হিসাব করুন" : "Get My Savings"}
          </button>
        </div>

        <div className="rounded-[24px] border border-border/70 bg-secondary/20 p-6">
          {parsed ? (
            <div className="space-y-3 text-sm sm:text-base">
              <ResultLine label={isBn ? "Your current bill" : "Your current bill"} value={`৳ ${parsed.bill.toLocaleString()}/month`} />
              <ResultLine label={isBn ? "Your Netso bill" : "Your Netso bill"} value={`৳ ${Math.round(parsed.netsoCost).toLocaleString()}/month`} />
              <ResultLine label={isBn ? "Monthly Savings" : "Monthly Savings"} value={`৳ ${Math.round(parsed.monthlySavings).toLocaleString()} (${parsed.savingsPct.toFixed(1)}%)`} highlight />
              <ResultLine label={isBn ? "Annual Savings" : "Annual Savings"} value={`৳ ${Math.round(parsed.annualSavings).toLocaleString()}`} />
              {parsed.paybackMonths ? (
                <ResultLine label={isBn ? "Estimated equity payback" : "Estimated equity payback"} value={`~${parsed.paybackMonths} months`} />
              ) : null}

              {parsed.roofMismatch ? (
                <div className="mt-4 rounded-xl border border-amber-400/40 bg-amber-100/40 p-3 text-amber-900">
                  <div className="flex items-start gap-2">
                    <TriangleAlert className="mt-0.5 h-4 w-4" />
                    <p>
                      {isBn
                        ? "Roof size ইনপুটটি বিল-ভিত্তিক ব্যবহার থেকে ২০% এর বেশি ভিন্ন।"
                        : "Your roof size suggests a consumption level that differs by more than 20%."}
                    </p>
                  </div>
                </div>
              ) : null}

              {submitted ? (
                <p className="mt-4 rounded-xl bg-primary/10 p-3 text-primary">
                  {isBn ? "ধন্যবাদ! আমরা দ্রুত যোগাযোগ করব।" : "Thanks! We received your request for a free site survey."}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-muted-foreground">{isBn ? "ফলাফল দেখতে বিল ইনপুট দিন।" : "Enter your bill to see instant savings."}</p>
          )}
        </div>
      </form>
    </section>
  );
}

function InputField({ label, error, id, children }: { label: string; error?: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function ResultLine({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={cn("flex items-start justify-between gap-3 rounded-xl p-2", highlight && "bg-primary/10")}>
      <p className="text-muted-foreground">{label}:</p>
      <p className={cn("text-right font-medium", highlight && "text-primary")}>{value}</p>
    </div>
  );
}

const inputCls = (hasError: boolean) =>
  `w-full rounded-2xl border bg-background/88 px-4 py-3 text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
    hasError ? "border-destructive" : "border-border/70"
  }`;
