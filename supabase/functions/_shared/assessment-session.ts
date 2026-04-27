import { SupabaseClient, createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

type AssessmentEntryPoint = "web_feasibility" | "calculator_handoff" | "whatsapp";
type QualificationStatus =
  | "started"
  | "in_progress"
  | "awaiting_evidence"
  | "auto_qualified"
  | "needs_manual_review"
  | "not_qualified"
  | "inspection_pending"
  | "inspection_confirmed"
  | "closed";
type InspectionReviewState =
  | "not_requested"
  | "manual_review"
  | "inspection_pending"
  | "inspection_confirmed"
  | "declined"
  | "closed";
type PreferredChannel = "whatsapp" | "phone";
type EvidenceReviewStatus = "pending_review" | "accepted" | "rejected";
type NextStep = "continue_on_whatsapp" | "review_for_engineering" | "schedule_site_visit";
type Language = "en" | "bn";
type HumanReviewOutcome = "pending" | "confirmed" | "declined" | "closed";

type EstimateRange = {
  low: number;
  midpoint: number;
  high: number;
};

type ProofEstimate = {
  systemKwp: number;
  systemKwpRange: EstimateRange;
  monthlySavings: number;
  monthlySavingsRange: EstimateRange;
  paybackYears: number;
  paybackYearsRange: EstimateRange;
  twentyYearProfit: number;
  twentyYearProfitRange: EstimateRange;
  co2Saved: number;
  annualGenerationKwh: number;
  confidenceLabel: "proof_first";
  assumptions: string[];
  disclaimer: string;
};

type AssessmentContact = {
  name?: string;
  phone: string;
  preferredChannel: PreferredChannel;
};

type AssessmentAnswers = {
  address?: string;
  district?: string;
  neighborhood?: string;
  propertyType?: string;
  buildingType?: string;
  ownershipStatus?: string;
  roofSizeBand?: string;
  roofAccessReadiness?: string;
  shadingStatus?: string;
  targetInstallTimeline?: string;
  primaryGoal?: string;
  servicePhase?: "single_phase" | "three_phase" | "unknown";
  monthlyBillBand?: string;
  monthlyBillAmount?: number;
  monthlyConsumptionKwh?: number;
  notes?: string;
};

type AssessmentEvidence = {
  kind: "roof_photo" | "electric_bill" | "voice_note" | "location_pin" | "document" | "other";
  captureChannel: "web_form" | "calculator" | "whatsapp";
  status: EvidenceReviewStatus;
  fileUrl?: string;
  storagePath?: string;
  note?: string;
  metadata?: Record<string, unknown>;
};

export type StartAssessmentSessionPayload = {
  entryPoint: AssessmentEntryPoint;
  preferredLanguage: Language;
  routeSource?: string;
  contact: AssessmentContact;
  answers: AssessmentAnswers;
  evidence: AssessmentEvidence[];
  calculatorContext?: {
    estimatedMonthlyBillBdt: number;
    estimatedMonthlyConsumptionKwh?: number;
    rooftopAreaSqft: number;
    estimate: ProofEstimate;
  };
};

type StartAssessmentSessionResponse = {
  success: true;
  nextStep: NextStep;
  session: {
    id: string;
    entryPoint: AssessmentEntryPoint;
    preferredLanguage: Language;
    routeSource?: string;
    qualificationStatus: QualificationStatus;
    inspectionReviewState: InspectionReviewState;
    qualificationScore?: number;
    humanReviewOutcome?: HumanReviewOutcome;
    contact: AssessmentContact;
    answers: AssessmentAnswers;
    evidence: AssessmentEvidence[];
    calculatorContext?: StartAssessmentSessionPayload["calculatorContext"];
    createdAt?: string;
    updatedAt?: string;
  };
};

type LegacyFeasibilityLeadPayload = {
  source: "feasibility";
  name: string;
  phone: string;
  address: string;
  buildingType: string;
  roofSize: string;
  monthlyBillRange: string;
};

type LegacyCalculatorLeadPayload = {
  source: "calculator";
  name: string;
  phone: string;
  address?: string;
  calculatorBillEstimate: number;
  calculatorAreaEstimate: number;
  modelOutput: ProofEstimate | LegacyModelOutput;
};

type LegacyModelOutput = {
  systemKwp: number;
  monthlySavings: number;
  paybackYears: number;
  twentyYearProfit: number;
  co2Saved: number;
};

type LegacyLeadPayload = LegacyFeasibilityLeadPayload | LegacyCalculatorLeadPayload;

type AssessmentSessionRow = {
  id: string;
  entry_point: AssessmentEntryPoint;
  preferred_language: Language;
  route_source: string | null;
  qualification_status: QualificationStatus;
  inspection_review_state: InspectionReviewState;
  qualification_score: number | null;
  human_review_outcome: HumanReviewOutcome | null;
  contact_name: string | null;
  phone: string;
  preferred_channel: PreferredChannel;
  address: string | null;
  answers: AssessmentAnswers | null;
  calculator_context: StartAssessmentSessionPayload["calculatorContext"] | null;
  created_at: string | null;
  updated_at: string | null;
};

const DEFAULT_PROOF_ASSUMPTIONS = [
  "Uses conservative roof utilisation assumptions.",
  "Sizes the system for proof-first self-consumption, not full-roof maximisation.",
];

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders,
  });
}

export function badRequest(message: string): Response {
  return jsonResponse({ success: false, error: message }, 400);
}

function serverError(message: string): Response {
  return jsonResponse({ success: false, error: message }, 500);
}

function methodNotAllowed(): Response {
  return jsonResponse({ success: false, error: "Method not allowed." }, 405);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown, minimum = 1): value is string {
  return typeof value === "string" && value.trim().length >= minimum;
}

function isFinitePositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isValidBangladeshPhone(value: string): boolean {
  return /^(?:\+?880|0)1[3-9]\d{8}$/.test(value.trim());
}

function isEstimateRange(value: unknown): value is EstimateRange {
  return (
    isRecord(value) &&
    typeof value.low === "number" &&
    typeof value.midpoint === "number" &&
    typeof value.high === "number" &&
    value.low <= value.midpoint &&
    value.midpoint <= value.high
  );
}

function isProofEstimate(value: unknown): value is ProofEstimate {
  return (
    isRecord(value) &&
    isFinitePositiveNumber(value.systemKwp) &&
    isEstimateRange(value.systemKwpRange) &&
    typeof value.monthlySavings === "number" &&
    isEstimateRange(value.monthlySavingsRange) &&
    isFinitePositiveNumber(value.paybackYears) &&
    isEstimateRange(value.paybackYearsRange) &&
    typeof value.twentyYearProfit === "number" &&
    isEstimateRange(value.twentyYearProfitRange) &&
    typeof value.co2Saved === "number" &&
    typeof value.annualGenerationKwh === "number" &&
    value.confidenceLabel === "proof_first" &&
    Array.isArray(value.assumptions) &&
    value.assumptions.every((item) => typeof item === "string") &&
    isNonEmptyString(value.disclaimer)
  );
}

function normalizeLegacyProofEstimate(value: unknown): ProofEstimate | null {
  if (isProofEstimate(value)) {
    return value;
  }

  if (!isRecord(value)) {
    return null;
  }

  const legacyValue = value as LegacyModelOutput;
  if (
    !isFinitePositiveNumber(legacyValue.systemKwp) ||
    typeof legacyValue.monthlySavings !== "number" ||
    !isFinitePositiveNumber(legacyValue.paybackYears) ||
    typeof legacyValue.twentyYearProfit !== "number" ||
    typeof legacyValue.co2Saved !== "number"
  ) {
    return null;
  }

  return {
    systemKwp: Number(legacyValue.systemKwp.toFixed(1)),
    systemKwpRange: {
      low: Number((legacyValue.systemKwp * 0.9).toFixed(1)),
      midpoint: Number(legacyValue.systemKwp.toFixed(1)),
      high: Number((legacyValue.systemKwp * 1.1).toFixed(1)),
    },
    monthlySavings: Math.round(legacyValue.monthlySavings),
    monthlySavingsRange: {
      low: Math.max(0, Math.round(legacyValue.monthlySavings * 0.8)),
      midpoint: Math.round(legacyValue.monthlySavings),
      high: Math.max(0, Math.round(legacyValue.monthlySavings * 1.15)),
    },
    paybackYears: Number(legacyValue.paybackYears.toFixed(1)),
    paybackYearsRange: {
      low: Number(Math.max(0.1, legacyValue.paybackYears * 0.9).toFixed(1)),
      midpoint: Number(legacyValue.paybackYears.toFixed(1)),
      high: Number((legacyValue.paybackYears * 1.15).toFixed(1)),
    },
    twentyYearProfit: Math.round(legacyValue.twentyYearProfit),
    twentyYearProfitRange: {
      low: Math.round(legacyValue.twentyYearProfit * 0.7),
      midpoint: Math.round(legacyValue.twentyYearProfit),
      high: Math.round(legacyValue.twentyYearProfit * 1.15),
    },
    co2Saved: Math.max(0, Math.round(legacyValue.co2Saved)),
    annualGenerationKwh: Math.max(0, Math.round(legacyValue.co2Saved / 0.62)),
    confidenceLabel: "proof_first",
    assumptions: DEFAULT_PROOF_ASSUMPTIONS,
    disclaimer:
      "Preliminary estimate only. Photos, bills, and shading checks can materially change the result.",
  };
}

function normalizeEvidence(value: unknown): AssessmentEvidence | null {
  if (!isRecord(value)) {
    return null;
  }

  const kind = value.kind;
  const captureChannel = value.captureChannel;
  const status = value.status;
  const note = isNonEmptyString(value.note) ? value.note.trim() : undefined;
  const fileUrl = isNonEmptyString(value.fileUrl) ? value.fileUrl.trim() : undefined;
  const storagePath = isNonEmptyString(value.storagePath) ? value.storagePath.trim() : undefined;

  if (
    kind !== "roof_photo" &&
    kind !== "electric_bill" &&
    kind !== "voice_note" &&
    kind !== "location_pin" &&
    kind !== "document" &&
    kind !== "other"
  ) {
    return null;
  }

  if (
    captureChannel !== "web_form" &&
    captureChannel !== "calculator" &&
    captureChannel !== "whatsapp"
  ) {
    return null;
  }

  if (status !== "pending_review" && status !== "accepted" && status !== "rejected") {
    return null;
  }

  if (!fileUrl && !storagePath && !note) {
    return null;
  }

  return {
    kind,
    captureChannel,
    status,
    fileUrl,
    storagePath,
    note,
    metadata: isRecord(value.metadata) ? value.metadata : {},
  };
}

function normalizeAnswers(value: unknown): AssessmentAnswers {
  if (!isRecord(value)) {
    return {};
  }

  return {
    address: isNonEmptyString(value.address, 5) ? value.address.trim() : undefined,
    district: isNonEmptyString(value.district, 2) ? value.district.trim() : undefined,
    neighborhood: isNonEmptyString(value.neighborhood, 2)
      ? value.neighborhood.trim()
      : undefined,
    propertyType: isNonEmptyString(value.propertyType) ? value.propertyType.trim() : undefined,
    buildingType: isNonEmptyString(value.buildingType) ? value.buildingType.trim() : undefined,
    ownershipStatus: isNonEmptyString(value.ownershipStatus)
      ? value.ownershipStatus.trim()
      : undefined,
    roofSizeBand: isNonEmptyString(value.roofSizeBand) ? value.roofSizeBand.trim() : undefined,
    roofAccessReadiness: isNonEmptyString(value.roofAccessReadiness)
      ? value.roofAccessReadiness.trim()
      : undefined,
    shadingStatus: isNonEmptyString(value.shadingStatus) ? value.shadingStatus.trim() : undefined,
    targetInstallTimeline: isNonEmptyString(value.targetInstallTimeline)
      ? value.targetInstallTimeline.trim()
      : undefined,
    primaryGoal: isNonEmptyString(value.primaryGoal) ? value.primaryGoal.trim() : undefined,
    servicePhase:
      value.servicePhase === "single_phase" ||
      value.servicePhase === "three_phase" ||
      value.servicePhase === "unknown"
        ? value.servicePhase
        : undefined,
    monthlyBillBand: isNonEmptyString(value.monthlyBillBand) ? value.monthlyBillBand.trim() : undefined,
    monthlyBillAmount: isFinitePositiveNumber(value.monthlyBillAmount)
      ? value.monthlyBillAmount
      : undefined,
    monthlyConsumptionKwh: isFinitePositiveNumber(value.monthlyConsumptionKwh)
      ? value.monthlyConsumptionKwh
      : undefined,
    notes: isNonEmptyString(value.notes) ? value.notes.trim() : undefined,
  };
}

function normalizeCalculatorContext(
  value: unknown,
): StartAssessmentSessionPayload["calculatorContext"] | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const estimate = normalizeLegacyProofEstimate(value.estimate);
  if (
    !isFinitePositiveNumber(value.estimatedMonthlyBillBdt) ||
    !isFinitePositiveNumber(value.rooftopAreaSqft) ||
    !estimate
  ) {
    return undefined;
  }

  return {
    estimatedMonthlyBillBdt: value.estimatedMonthlyBillBdt,
    estimatedMonthlyConsumptionKwh: isFinitePositiveNumber(value.estimatedMonthlyConsumptionKwh)
      ? value.estimatedMonthlyConsumptionKwh
      : undefined,
    rooftopAreaSqft: value.rooftopAreaSqft,
    estimate,
  };
}

export function normalizeStartAssessmentPayload(
  payload: unknown,
): StartAssessmentSessionPayload | null {
  if (!isRecord(payload)) {
    return null;
  }

  if (payload.source === "feasibility" || payload.source === "calculator") {
    return normalizeLegacyLeadPayload(payload as LegacyLeadPayload);
  }

  if (
    payload.entryPoint !== "web_feasibility" &&
    payload.entryPoint !== "calculator_handoff" &&
    payload.entryPoint !== "whatsapp"
  ) {
    return null;
  }

  const contact = payload.contact;
  if (!isRecord(contact) || !isNonEmptyString(contact.phone) || !isValidBangladeshPhone(contact.phone)) {
    return null;
  }

  const preferredLanguage =
    payload.preferredLanguage === "bn" ? "bn" : ("en" as Language);
  const routeSource = isNonEmptyString(payload.routeSource) ? payload.routeSource.trim() : undefined;
  const preferredChannel =
    contact.preferredChannel === "phone" ? "phone" : ("whatsapp" as PreferredChannel);
  const contactName = isNonEmptyString(contact.name, 2) ? contact.name.trim() : undefined;
  if (payload.entryPoint !== "whatsapp" && !contactName) {
    return null;
  }

  const answers = normalizeAnswers(payload.answers);
  const evidence = Array.isArray(payload.evidence)
    ? payload.evidence
        .map((item) => normalizeEvidence(item))
        .filter((item): item is AssessmentEvidence => item !== null)
    : [];

  if (
    payload.entryPoint === "web_feasibility" &&
    (!answers.address ||
      !answers.district ||
      !answers.neighborhood ||
      !(answers.propertyType || answers.buildingType) ||
      !answers.ownershipStatus ||
      !answers.roofSizeBand ||
      !answers.roofAccessReadiness ||
      !answers.shadingStatus ||
      !answers.targetInstallTimeline ||
      !answers.primaryGoal ||
      !answers.monthlyBillBand)
  ) {
    return null;
  }

  const calculatorContext = normalizeCalculatorContext(payload.calculatorContext);
  if (payload.entryPoint === "calculator_handoff" && !calculatorContext) {
    return null;
  }

  return {
    entryPoint: payload.entryPoint,
    preferredLanguage,
    routeSource,
    contact: {
      name: contactName,
      phone: contact.phone.trim(),
      preferredChannel,
    },
    answers,
    evidence,
    calculatorContext,
  };
}

function normalizeLegacyLeadPayload(payload: LegacyLeadPayload): StartAssessmentSessionPayload | null {
  if (
    !isNonEmptyString(payload.name, 2) ||
    !isNonEmptyString(payload.phone) ||
    !isValidBangladeshPhone(payload.phone)
  ) {
    return null;
  }

  if (payload.source === "feasibility") {
    if (
      !isNonEmptyString(payload.address, 5) ||
      !isNonEmptyString(payload.buildingType) ||
      !isNonEmptyString(payload.roofSize) ||
      !isNonEmptyString(payload.monthlyBillRange)
    ) {
      return null;
    }

    return {
      entryPoint: "web_feasibility",
      preferredLanguage: "en",
      routeSource: "legacy_feasibility",
      contact: {
        name: payload.name.trim(),
        phone: payload.phone.trim(),
        preferredChannel: "whatsapp",
      },
      answers: {
        address: payload.address.trim(),
        propertyType: payload.buildingType.trim(),
        buildingType: payload.buildingType.trim(),
        roofSizeBand: payload.roofSize.trim(),
        monthlyBillBand: payload.monthlyBillRange.trim(),
      },
      evidence: [],
    };
  }

  if (!isFinitePositiveNumber(payload.calculatorBillEstimate) || !isFinitePositiveNumber(payload.calculatorAreaEstimate)) {
    return null;
  }

  const estimate = normalizeLegacyProofEstimate(payload.modelOutput);
  if (!estimate) {
    return null;
  }

  return {
    entryPoint: "calculator_handoff",
    preferredLanguage: "en",
    routeSource: "legacy_calculator",
    contact: {
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      preferredChannel: "whatsapp",
    },
    answers: isNonEmptyString(payload.address, 5) ? { address: payload.address.trim() } : {},
    evidence: [],
    calculatorContext: {
      estimatedMonthlyBillBdt: payload.calculatorBillEstimate,
      estimatedMonthlyConsumptionKwh: Number((payload.calculatorBillEstimate / 9.5).toFixed(1)),
      rooftopAreaSqft: payload.calculatorAreaEstimate,
      estimate,
    },
  };
}

function hasEvidenceOfKind(
  evidence: AssessmentEvidence[],
  kind: AssessmentEvidence["kind"],
): boolean {
  return evidence.some((item) => item.kind === kind);
}

function deriveQualificationScore(payload: StartAssessmentSessionPayload): number {
  let score = 0;
  const { answers } = payload;

  if (payload.contact.name) score += 10;
  if (answers.district && answers.neighborhood) score += 10;
  if (answers.propertyType || answers.buildingType) score += 10;
  if (answers.ownershipStatus) score += 10;
  if (answers.monthlyBillBand || answers.monthlyBillAmount) score += 10;
  if (answers.roofSizeBand) score += 10;
  if (answers.roofAccessReadiness) score += 10;
  if (answers.shadingStatus) score += 10;
  if (answers.targetInstallTimeline) score += 5;
  if (answers.primaryGoal) score += 5;
  if (hasEvidenceOfKind(payload.evidence, "electric_bill")) score += 10;
  if (hasEvidenceOfKind(payload.evidence, "roof_photo")) score += 10;

  return Math.min(score, 100);
}

function deriveSessionLifecycle(payload: StartAssessmentSessionPayload): {
  qualificationStatus: QualificationStatus;
  inspectionReviewState: InspectionReviewState;
  qualificationScore: number;
  humanReviewOutcome: HumanReviewOutcome;
  nextStep: NextStep;
} {
  const score = deriveQualificationScore(payload);
  const { answers } = payload;
  const hasBillEvidence = hasEvidenceOfKind(payload.evidence, "electric_bill");
  const hasRoofEvidence = hasEvidenceOfKind(payload.evidence, "roof_photo");
  const hasCoreFeasibilityFields = Boolean(
    answers.address &&
      answers.district &&
      answers.neighborhood &&
      (answers.propertyType || answers.buildingType) &&
      answers.ownershipStatus &&
      answers.roofSizeBand &&
      answers.roofAccessReadiness &&
      answers.shadingStatus &&
      answers.targetInstallTimeline &&
      answers.primaryGoal &&
      answers.monthlyBillBand,
  );
  const evidenceReady = hasBillEvidence && hasRoofEvidence;
  const ownershipReady = /owner|decision/i.test(answers.ownershipStatus ?? "");
  const roofLikelyBlocked = /heavy|blocked|impossible/i.test(
    `${answers.shadingStatus ?? ""} ${answers.roofAccessReadiness ?? ""}`,
  );

  if (roofLikelyBlocked) {
    return {
      qualificationStatus: "not_qualified",
      inspectionReviewState: "declined",
      qualificationScore: score,
      humanReviewOutcome: "declined",
      nextStep: "review_for_engineering",
    };
  }

  if (payload.entryPoint === "whatsapp" && score < 30 && payload.evidence.length === 0) {
    return {
      qualificationStatus: "started",
      inspectionReviewState: "not_requested",
      qualificationScore: score,
      humanReviewOutcome: "pending",
      nextStep: "continue_on_whatsapp",
    };
  }

  if (!hasCoreFeasibilityFields) {
    return {
      qualificationStatus: "in_progress",
      inspectionReviewState: "manual_review",
      qualificationScore: score,
      humanReviewOutcome: "pending",
      nextStep: "continue_on_whatsapp",
    };
  }

  if (!evidenceReady) {
    return {
      qualificationStatus: "awaiting_evidence",
      inspectionReviewState: "manual_review",
      qualificationScore: score,
      humanReviewOutcome: "pending",
      nextStep: "continue_on_whatsapp",
    };
  }

  if (ownershipReady) {
    return {
      qualificationStatus: "auto_qualified",
      inspectionReviewState: "inspection_pending",
      qualificationScore: Math.max(score, 80),
      humanReviewOutcome: "pending",
      nextStep: "schedule_site_visit",
    };
  }

  return {
    qualificationStatus: "needs_manual_review",
    inspectionReviewState: "manual_review",
    qualificationScore: score,
    humanReviewOutcome: "pending",
    nextStep: "review_for_engineering",
  };
}

function buildSessionSummary(payload: StartAssessmentSessionPayload): Record<string, unknown> {
  return {
    handoffReady: payload.contact.preferredChannel === "whatsapp",
    receivedFrom: payload.entryPoint,
    routeSource: payload.routeSource ?? payload.entryPoint,
    preferredLanguage: payload.preferredLanguage,
    hasCalculatorContext: Boolean(payload.calculatorContext),
    answerKeys: Object.keys(payload.answers).filter((key) => payload.answers[key as keyof AssessmentAnswers] !== undefined),
    evidenceCount: payload.evidence.length,
    evidenceKinds: payload.evidence.map((item) => item.kind),
  };
}

function buildOutboundEventType(payload: StartAssessmentSessionPayload): string {
  if (payload.entryPoint === "calculator_handoff") {
    return "calculator_handoff_requested";
  }

  if (payload.entryPoint === "web_feasibility") {
    return "web_assessment_started";
  }

  return "whatsapp_assessment_started";
}

function mapSessionRowToResponse(
  row: AssessmentSessionRow,
  payload: StartAssessmentSessionPayload,
  nextStep: NextStep,
): StartAssessmentSessionResponse {
  return {
    success: true,
    nextStep,
    session: {
      id: row.id,
      entryPoint: row.entry_point,
      preferredLanguage: row.preferred_language,
      routeSource: row.route_source ?? payload.routeSource,
      qualificationStatus: row.qualification_status,
      inspectionReviewState: row.inspection_review_state,
      qualificationScore: row.qualification_score ?? undefined,
      humanReviewOutcome: row.human_review_outcome ?? undefined,
      contact: {
        name: row.contact_name ?? payload.contact.name,
        phone: row.phone,
        preferredChannel: row.preferred_channel,
      },
      answers: row.answers ?? payload.answers,
      evidence: payload.evidence,
      calculatorContext: row.calculator_context ?? payload.calculatorContext,
      createdAt: row.created_at ?? undefined,
      updatedAt: row.updated_at ?? undefined,
    },
  };
}

export function getServiceSupabaseClient(): SupabaseClient {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase server secrets are missing.");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function persistAssessmentSession(
  supabase: SupabaseClient,
  payload: StartAssessmentSessionPayload,
): Promise<StartAssessmentSessionResponse> {
  const lifecycle = deriveSessionLifecycle(payload);

  const sessionInsert = {
    entry_point: payload.entryPoint,
    preferred_language: payload.preferredLanguage,
    route_source: payload.routeSource ?? payload.entryPoint,
    qualification_status: lifecycle.qualificationStatus,
    inspection_review_state: lifecycle.inspectionReviewState,
    qualification_score: lifecycle.qualificationScore,
    human_review_outcome: lifecycle.humanReviewOutcome,
    contact_name: payload.contact.name ?? null,
    phone: payload.contact.phone,
    preferred_channel: payload.contact.preferredChannel,
    address: payload.answers.address ?? null,
    answers: payload.answers,
    calculator_context: payload.calculatorContext ?? null,
    source_summary: buildSessionSummary(payload),
    last_whatsapp_message_at: payload.entryPoint === "whatsapp" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  const { data: sessionRow, error: sessionError } = await supabase
    .from("assessment_sessions")
    .insert(sessionInsert)
    .select(
      "id, entry_point, preferred_language, route_source, qualification_status, inspection_review_state, qualification_score, human_review_outcome, contact_name, phone, preferred_channel, address, answers, calculator_context, created_at, updated_at",
    )
    .single<AssessmentSessionRow>();

  if (sessionError || !sessionRow) {
    throw new Error("Unable to save assessment session.");
  }

  if (payload.evidence.length > 0) {
    const evidenceRows = payload.evidence.map((evidence) => ({
      assessment_session_id: sessionRow.id,
      evidence_kind: evidence.kind,
      capture_channel: evidence.captureChannel,
      review_status: evidence.status,
      file_url: evidence.fileUrl ?? null,
      storage_path: evidence.storagePath ?? null,
      note: evidence.note ?? null,
      metadata: evidence.metadata ?? {},
    }));

    const { error: evidenceError } = await supabase.from("assessment_evidence").insert(evidenceRows);

    if (evidenceError) {
      throw new Error("Assessment session saved, but evidence could not be stored.");
    }
  }

  const outboundEvent = {
    assessment_session_id: sessionRow.id,
    phone: payload.contact.phone,
    direction: "outbound",
    event_type: buildOutboundEventType(payload),
    payload: {
      nextStep: lifecycle.nextStep,
      preferredChannel: payload.contact.preferredChannel,
      summary: buildSessionSummary(payload),
    },
    processed_at: new Date().toISOString(),
  };

  await supabase.from("whatsapp_intake_events").insert(outboundEvent);

  return mapSessionRowToResponse(sessionRow, payload, lifecycle.nextStep);
}

export async function handleStartAssessmentSession(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return methodNotAllowed();
  }

  let parsedBody: unknown;
  try {
    parsedBody = await request.json();
  } catch {
    return badRequest("Request body must be valid JSON.");
  }

  const normalizedPayload = normalizeStartAssessmentPayload(parsedBody);
  if (!normalizedPayload) {
    return badRequest("Invalid assessment session payload.");
  }

  try {
    const supabase = getServiceSupabaseClient();
    const response = await persistAssessmentSession(supabase, normalizedPayload);
    return jsonResponse(response);
  } catch (error) {
    return serverError(error instanceof Error ? error.message : "Unable to start assessment session.");
  }
}
