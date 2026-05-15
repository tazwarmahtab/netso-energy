# Netso Energy – Automated Nurture Sequence (Scale Engine) – End‑to‑End Specification (SPEC-NURTURE-03)

## 1. Business Goal
Maximize conversion of Savings Calculator leads by using a logic-driven follow-up waterfall from calculation completion to scheduled site survey.

## 2. Communication Waterfall
- T+0: send personalized report email immediately.
- T+24h (if no booking): send case study/social-proof email.
- T+72h (if no booking): send objection-handling value email/WhatsApp.
- T+7d (if no booking): send scarcity/urgency email/WhatsApp.
- T+10d: mark cold and move to newsletter cadence.

## 3. Stack & Integrations
- Trigger: Savings Calculator → `POST /api/lead`
- Automation: Make.com / n8n / custom Node.js
- Email: SendGrid or Mailgun
- WhatsApp: Twilio or Meta Cloud API
- CRM: PostgreSQL/Sales Tracker state transitions

## 4. Message Specs
- Email 1 (Hook): Personalized savings report + CTA to book survey.
- Email 2 (Proof): Case study + financing mention + CTA.
- Email 3 (Logic): Objection handling + consultation CTA.
- Email 4 (Urgency): Limited-slot scarcity CTA.

## 5. Pseudocode
```javascript
on(LEAD_SUBMITTED, (lead) => {
  SendEmail(lead.email, "Welcome_Report_Template", { savings: lead.savings });
  UpdateCRM(lead.id, "Warm");
  Schedule(lead.id, "T+24h", "Case_Study_Template");
  Schedule(lead.id, "T+72h", "Myth_Buster_Template");
  Schedule(lead.id, "T+7d", "Urgency_Template");
});

on(SURVEY_BOOKED, (lead) => {
  CancelAllScheduled(lead.id);
  UpdateCRM(lead.id, "Hot");
  NotifyFounder(lead.id, "New Site Survey Booked!");
});
```

## 6. Acceptance Criteria
- Calculator-to-automation integration works reliably.
- All templates are branded, dark-mode aligned, and mobile-responsive.
- Survey booking cancels pending nurture steps.
- CRM status updates are automated across lifecycle stages.
- Deliverability tests pass (primary inbox placement target).
