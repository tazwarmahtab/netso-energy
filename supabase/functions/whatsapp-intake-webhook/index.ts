import {
  badRequest,
  corsHeaders,
  getServiceSupabaseClient,
} from "../_shared/assessment-session.ts";

type WhatsappInboundEvent = {
  direction: "inbound" | "status";
  eventType: string;
  phone: string;
  profileName?: string;
  messagePreview?: string;
  hasMedia: boolean;
  evidenceKind?: "roof_photo" | "electric_bill" | "voice_note" | "document" | "other";
  payload: Record<string, unknown>;
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders,
  });
}

function forbidden(message: string): Response {
  return jsonResponse({ success: false, error: message }, 403);
}

function unauthorizedSignature(): Response {
  return forbidden("Invalid webhook signature.");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseSignatureHeader(signatureHeader: string): string | null {
  const [scheme, signature] = signatureHeader.trim().split("=", 2);
  if (scheme !== "sha256" || !signature) {
    return null;
  }

  return /^[a-f0-9]{64}$/i.test(signature) ? signature.toLowerCase() : null;
}

function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  const maxLength = Math.max(a.length, b.length);
  let mismatch = a.length ^ b.length;

  for (let i = 0; i < maxLength; i += 1) {
    const aByte = i < a.length ? a[i] : 0;
    const bByte = i < b.length ? b[i] : 0;
    mismatch |= aByte ^ bByte;
  }

  return mismatch === 0;
}

async function verifyRequestSignature(request: Request, rawBody: string): Promise<boolean> {
  const appSecret = Deno.env.get("WHATSAPP_APP_SECRET");
  const headerValue = request.headers.get("X-Hub-Signature-256");

  if (!appSecret || !headerValue) {
    return false;
  }

  const providedSignature = parseSignatureHeader(headerValue);
  if (!providedSignature) {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const digest = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const digestBytes = new Uint8Array(digest);
  const computedHex = Array.from(digestBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

  return constantTimeEqual(
    new TextEncoder().encode(computedHex),
    new TextEncoder().encode(providedSignature),
  );
}

function eventTypeForMessage(message: Record<string, unknown>): WhatsappInboundEvent["eventType"] {
  const type = message.type;

  switch (type) {
    case "image":
      return "message.image";
    case "audio":
      return "message.audio";
    case "voice":
      return "message.voice";
    case "document":
      return "message.document";
    case "location":
      return "message.location";
    default:
      return "message.text";
  }
}

function evidenceKindForMessage(
  message: Record<string, unknown>,
): WhatsappInboundEvent["evidenceKind"] | undefined {
  switch (message.type) {
    case "image":
      return "roof_photo";
    case "document":
      return "electric_bill";
    case "audio":
    case "voice":
      return "voice_note";
    default:
      return undefined;
  }
}

function getMessagePreview(message: Record<string, unknown>): string | undefined {
  if (isRecord(message.text) && isNonEmptyString(message.text.body)) {
    return message.text.body.trim().slice(0, 240);
  }

  if (isRecord(message.image) && isNonEmptyString(message.image.caption)) {
    return message.image.caption.trim().slice(0, 240);
  }

  if (isRecord(message.document) && isNonEmptyString(message.document.caption)) {
    return message.document.caption.trim().slice(0, 240);
  }

  return undefined;
}

function normalizeWhatsappEvents(body: unknown): WhatsappInboundEvent[] {
  if (!isRecord(body) || !Array.isArray(body.entry)) {
    return [];
  }

  const events: WhatsappInboundEvent[] = [];

  for (const entry of body.entry) {
    if (!isRecord(entry) || !Array.isArray(entry.changes)) {
      continue;
    }

    for (const change of entry.changes) {
      if (!isRecord(change) || !isRecord(change.value)) {
        continue;
      }

      const value = change.value;
      const contacts = Array.isArray(value.contacts) ? value.contacts : [];
      const firstContact = contacts.find((contact): contact is Record<string, unknown> => isRecord(contact));
      const profileName =
        firstContact && isRecord(firstContact.profile) && isNonEmptyString(firstContact.profile.name)
          ? firstContact.profile.name.trim()
          : undefined;

      const messages = Array.isArray(value.messages) ? value.messages : [];
      for (const message of messages) {
        if (!isRecord(message) || !isNonEmptyString(message.from)) {
          continue;
        }

        events.push({
          direction: "inbound",
          eventType: eventTypeForMessage(message),
          phone: message.from.trim(),
          profileName,
          messagePreview: getMessagePreview(message),
          hasMedia: message.type === "image" || message.type === "audio" || message.type === "document",
          evidenceKind: evidenceKindForMessage(message),
          payload: message,
        });
      }

      const statuses = Array.isArray(value.statuses) ? value.statuses : [];
      for (const status of statuses) {
        if (!isRecord(status) || !isNonEmptyString(status.recipient_id) || !isNonEmptyString(status.status)) {
          continue;
        }

        events.push({
          direction: "status",
          eventType: `status.${status.status.trim()}`,
          phone: status.recipient_id.trim(),
          profileName,
          messagePreview: undefined,
          hasMedia: false,
          payload: status,
        });
      }
    }
  }

  return events;
}

async function findLatestSessionIdForPhone(phone: string): Promise<string | null> {
  const supabase = getServiceSupabaseClient();
  const { data, error } = await supabase
    .from("assessment_sessions")
    .select("id")
    .eq("phone", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string }>();

  if (error || !data) {
    return null;
  }

  return data.id;
}

async function ensureWhatsappSession(event: WhatsappInboundEvent): Promise<string | null> {
  const supabase = getServiceSupabaseClient();
  const existingSessionId = await findLatestSessionIdForPhone(event.phone);

  if (existingSessionId) {
    await supabase
      .from("assessment_sessions")
      .update({
        last_whatsapp_message_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        contact_name: event.profileName ?? undefined,
      })
      .eq("id", existingSessionId);

    return existingSessionId;
  }

  if (event.direction !== "inbound") {
    return null;
  }

  const answers = event.messagePreview
    ? {
        notes: `Started from WhatsApp: ${event.messagePreview}`,
      }
    : {
        notes: "Started from WhatsApp webhook skeleton.",
      };

  const { data, error } = await supabase
    .from("assessment_sessions")
    .insert({
      entry_point: "whatsapp",
      preferred_language: "en",
      route_source: "whatsapp_webhook",
      qualification_status: event.hasMedia ? "awaiting_evidence" : "started",
      inspection_review_state: event.hasMedia ? "manual_review" : "not_requested",
      qualification_score: event.hasMedia ? 20 : 10,
      human_review_outcome: "pending",
      contact_name: event.profileName ?? null,
      phone: event.phone,
      preferred_channel: "whatsapp",
      address: null,
      answers,
      calculator_context: null,
      source_summary: {
        receivedFrom: "whatsapp-intake-webhook",
        eventType: event.eventType,
      },
      last_whatsapp_message_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select("id")
    .single<{ id: string }>();

  if (error || !data) {
    return null;
  }

  return data.id;
}

async function captureEvidenceIfPresent(event: WhatsappInboundEvent, sessionId: string): Promise<void> {
  if (event.direction !== "inbound" || !event.hasMedia || !event.evidenceKind) {
    return;
  }

  const supabase = getServiceSupabaseClient();
  await supabase.from("assessment_evidence").insert({
    assessment_session_id: sessionId,
    evidence_kind: event.evidenceKind,
    capture_channel: "whatsapp",
    review_status: "pending_review",
    note: event.messagePreview ?? "Captured from WhatsApp webhook skeleton.",
    metadata: event.payload,
  });
}

async function persistEvent(event: WhatsappInboundEvent, sessionId: string | null): Promise<void> {
  const supabase = getServiceSupabaseClient();
  await supabase.from("whatsapp_intake_events").insert({
    assessment_session_id: sessionId,
    phone: event.phone,
    direction: event.direction,
    event_type: event.eventType,
    payload: event.payload,
    processed_at: new Date().toISOString(),
  });
}

function verifyWebhook(url: URL): Response {
  const mode = url.searchParams.get("hub.mode");
  const verifyToken = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expectedToken = Deno.env.get("WHATSAPP_VERIFY_TOKEN");

  if (mode !== "subscribe" || !challenge || !expectedToken) {
    return forbidden("Webhook verification failed.");
  }

  if (verifyToken !== expectedToken) {
    return forbidden("Webhook verification token mismatch.");
  }

  return new Response(challenge, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain",
    },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method === "GET") {
    return verifyWebhook(new URL(request.url));
  }

  if (request.method !== "POST") {
    return jsonResponse({ success: false, error: "Method not allowed." }, 405);
  }

  const rawBody = await request.text();
  const isSignatureValid = await verifyRequestSignature(request, rawBody);
  if (!isSignatureValid) {
    return unauthorizedSignature();
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return badRequest("Request body must be valid JSON.");
  }

  const events = normalizeWhatsappEvents(parsedBody);
  if (events.length === 0) {
    return jsonResponse({ success: true, received: 0, ignored: true });
  }

  let processed = 0;

  for (const event of events) {
    const sessionId = await ensureWhatsappSession(event);
    if (sessionId) {
      await captureEvidenceIfPresent(event, sessionId);
    }
    await persistEvent(event, sessionId);
    processed += 1;
  }

  return jsonResponse({
    success: true,
    received: processed,
  });
});
