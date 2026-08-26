#!/usr/bin/env node
// scripts/qwen-vision.mjs
// Smoke test for the new DashScope / qwen3.8-max account.
// Loads DASHSCOPE_API_KEY from .env at the project root (gitignored).
// Usage:  node scripts/qwen-vision.mjs

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// --- 1. Load .env from the project root (one level up from scripts/) ---
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");
try {
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = val;
  }
} catch (err) {
  console.error(`Could not read .env at ${envPath}:`, err.message);
  process.exit(1);
}

const apiKey = process.env.DASHSCOPE_API_KEY;
if (!apiKey || apiKey === "__paste_your_new_key_here__") {
  console.error(
    "DASHSCOPE_API_KEY is missing or still the placeholder.\n" +
      "Open .env in your editor and paste your NEW key, then save."
  );
  process.exit(1);
}

// --- 2. Call DashScope's Multimodal Conversation API (international endpoint) ---
const url =
  "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation";

const body = {
  model: "qwen3.8-max",
  input: {
    messages: [
      {
        role: "user",
        content: [
          {
            image:
              "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg",
          },
          { text: "What is depicted in the image? Answer in one sentence." },
        ],
      },
    ],
  },
  parameters: { result_format: "message" },
};

let resp;
try {
  resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
} catch (err) {
  console.error("Network error:", err.message);
  process.exit(1);
}

const text = await resp.text();
let data;
try {
  data = JSON.parse(text);
} catch {
  console.error("Non-JSON response (status", resp.status, "):\n", text);
  process.exit(1);
}

if (!resp.ok) {
  console.error("API error (status", resp.status, "):");
  console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}

// --- 3. Print the answer (and any reasoning, if present) ---
const choice = data?.output?.choices?.[0];
const msg = choice?.message;
if (msg?.reasoning_content) {
  console.log("[Reasoning]");
  console.log(String(msg.reasoning_content).slice(0, 500));
  console.log();
}
const text0 = msg?.content?.[0]?.text;
if (text0) {
  console.log("[Answer]");
  console.log(text0);
} else {
  console.log("[Raw response]");
  console.log(JSON.stringify(data, null, 2));
}
