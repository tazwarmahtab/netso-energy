import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const buildingTypes = [
  "Single-family home",
  "Apartment building",
  "Commercial building",
  "Industrial / warehouse",
  "Other",
];

const roofSizes = [
  "Under 500 sq ft",
  "500–1,000 sq ft",
  "1,000–2,000 sq ft",
  "2,000–5,000 sq ft",
  "Over 5,000 sq ft",
];

const billRanges = [
  "Under BDT 3,000",
  "BDT 3,000–7,000",
  "BDT 7,000–15,000",
  "BDT 15,000–30,000",
  "Over BDT 30,000",
];

// Bangladesh phone validation: +880 or 0 followed by 1 then 9 digits
const bdPhoneRegex = /^(?:\+?880|0)1[3-9]\d{8}$/;

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(bdPhoneRegex, "Enter a valid Bangladesh number (e.g. 01XXXXXXXXX)"),
  address: z.string().trim().min(5, "Please enter a full address").max(200),
  buildingType: z.string().min(1, "Select a building type"),
  roofSize: z.string().min(1, "Select your roof size"),
  monthlyBill: z.string().min(1, "Select your monthly bill range"),
});

type FormValues = z.infer<typeof formSchema>;

const initial: FormValues = {
  name: "",
  phone: "",
  address: "",
  buildingType: "",
  roofSize: "",
  monthlyBill: "",
};

const Feasibility = () => {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormValues>(key: K, v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      // Persist locally as a working baseline. Lovable Cloud can replace this later.
      const existing = JSON.parse(localStorage.getItem("netso_leads") || "[]");
      existing.push({ ...result.data, submittedAt: new Date().toISOString() });
      localStorage.setItem("netso_leads", JSON.stringify(existing));
      await new Promise((r) => setTimeout(r, 700));
      setSubmitted(true);
      toast.success("Feasibility request received.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="pt-40 pb-32 md:pt-52 md:pb-44 min-h-[80vh] flex items-center">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-8">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="display-text text-4xl md:text-6xl text-balance">
              Your rooftop is in the queue.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Our engineering team will analyse your details and reach out within
              <span className="text-foreground"> 48 hours</span> with a feasibility report
              and a fixed-price quote.
            </p>
            <button
              onClick={() => {
                setValues(initial);
                setSubmitted(false);
              }}
              className="mt-10 text-sm text-primary hover:text-primary-glow transition-colors"
            >
              Submit another rooftop →
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-40 pb-12 md:pt-52 md:pb-16 relative">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-50" />
        <div className="container-tight">
          <p className="eyebrow mb-6">Feasibility check</p>
          <h1 className="display-text text-5xl md:text-7xl max-w-3xl text-balance">
            Let's see what your rooftop can <span className="italic text-primary">do</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            60 seconds. No obligation. We'll respond within 48 hours with a
            generation forecast and fixed-price quote.
          </p>
        </div>
      </section>

      <section className="pb-32 md:pb-44">
        <div className="container-tight max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup label="Your name" error={errors.name} htmlFor="name">
              <input
                id="name"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Full name"
                className={inputCls(!!errors.name)}
                maxLength={80}
              />
            </FieldGroup>

            <div className="grid md:grid-cols-2 gap-6">
              <FieldGroup label="Phone (Bangladesh)" error={errors.phone} htmlFor="phone">
                <input
                  id="phone"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className={inputCls(!!errors.phone)}
                  maxLength={20}
                />
              </FieldGroup>

              <FieldGroup label="Building type" error={errors.buildingType} htmlFor="buildingType">
                <select
                  id="buildingType"
                  value={values.buildingType}
                  onChange={(e) => update("buildingType", e.target.value)}
                  className={inputCls(!!errors.buildingType)}
                >
                  <option value="">Select…</option>
                  {buildingTypes.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </FieldGroup>
            </div>

            <FieldGroup label="Address" error={errors.address} htmlFor="address">
              <input
                id="address"
                value={values.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="House, road, area, city"
                className={inputCls(!!errors.address)}
                maxLength={200}
              />
            </FieldGroup>

            <div className="grid md:grid-cols-2 gap-6">
              <FieldGroup label="Roof size" error={errors.roofSize} htmlFor="roofSize">
                <select
                  id="roofSize"
                  value={values.roofSize}
                  onChange={(e) => update("roofSize", e.target.value)}
                  className={inputCls(!!errors.roofSize)}
                >
                  <option value="">Select…</option>
                  {roofSizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </FieldGroup>

              <FieldGroup label="Monthly electricity bill" error={errors.monthlyBill} htmlFor="monthlyBill">
                <select
                  id="monthlyBill"
                  value={values.monthlyBill}
                  onChange={(e) => update("monthlyBill", e.target.value)}
                  className={inputCls(!!errors.monthlyBill)}
                >
                  <option value="">Select…</option>
                  {billRanges.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </FieldGroup>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-sun transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:opacity-60 disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Get my feasibility report"
              )}
            </button>

            <p className="text-xs text-muted-foreground">
              By submitting, you agree to be contacted by NETSO regarding your rooftop.
              We never share your details.
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

const inputCls = (hasError: boolean) =>
  `w-full rounded-lg border bg-input/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-primary focus:bg-input focus:ring-2 focus:ring-primary/20 ${
    hasError ? "border-destructive" : "border-border"
  }`;

const FieldGroup = ({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-medium mb-2">
      {label}
    </label>
    {children}
    {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
  </div>
);

export default Feasibility;
