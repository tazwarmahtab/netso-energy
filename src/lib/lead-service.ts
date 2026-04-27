import { getSupabaseClient } from "@/lib/supabase-client";
import {
  LeadSubmissionPayload,
  StartAssessmentSessionResponse,
  startAssessmentSessionResponseSchema,
  startAssessmentSessionSchema,
} from "@/lib/lead-types";

export class AssessmentBackendUnavailableError extends Error {
  constructor(message = "Assessment intake is unavailable right now.") {
    super(message);
    this.name = "AssessmentBackendUnavailableError";
  }
}

function isNamedError(error: unknown, name: string) {
  return error instanceof Error && error.name === name;
}

function getFunctionsErrorResponse(error: unknown) {
  if (!error || typeof error !== "object" || !("context" in error)) return null;

  const context = (error as { context?: unknown }).context;
  return context instanceof Response ? context : null;
}

async function isFunctionMissing(error: unknown) {
  const response = getFunctionsErrorResponse(error);
  if (!response) return false;
  if (response.status === 404) return true;

  try {
    const payload = await response.clone().json();
    if (
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
    ) {
      return payload.message.toLowerCase().includes("not found");
    }
  } catch {
    return false;
  }

  return false;
}

async function formatFunctionError(error: unknown) {
  if (isNamedError(error, "FunctionsFetchError") || isNamedError(error, "FunctionsRelayError")) {
    return new AssessmentBackendUnavailableError();
  }

  if (isNamedError(error, "FunctionsHttpError")) {
    if ((await isFunctionMissing(error)) || error.context?.status >= 500) {
      return new AssessmentBackendUnavailableError();
    }

    const response = getFunctionsErrorResponse(error);
    if (response) {
      try {
        const payload = await response.clone().json();
        if (
          payload &&
          typeof payload === "object" &&
          "message" in payload &&
          typeof payload.message === "string"
        ) {
          return new Error(payload.message);
        }
      } catch {
        // Ignore JSON parsing issues and fall back to the generic message.
      }
    }
  }

  if (error instanceof Error) {
    if (error.message.toLowerCase().includes("not found")) {
      return new AssessmentBackendUnavailableError();
    }

    return error;
  }

  return new Error("Assessment session start failed.");
}

export async function startAssessmentSession(
  payload: LeadSubmissionPayload,
): Promise<StartAssessmentSessionResponse> {
  const validatedPayload = startAssessmentSessionSchema.parse(payload);
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase.functions.invoke("start-assessment-session", {
    body: validatedPayload,
  });

  if (error) {
    throw await formatFunctionError(error);
  }

  const parsed = startAssessmentSessionResponseSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Assessment session start returned an invalid response.");
  }

  return parsed.data;
}

export async function submitLead(
  payload: LeadSubmissionPayload,
): Promise<StartAssessmentSessionResponse> {
  return startAssessmentSession(payload);
}
