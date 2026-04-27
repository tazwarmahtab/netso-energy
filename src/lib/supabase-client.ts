import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let cachedClientPromise: Promise<SupabaseClient> | null = null;

export function isSupabaseBrowserConfigured() {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

export async function getSupabaseClient(): Promise<SupabaseClient> {
  if (cachedClientPromise) return cachedClientPromise;

  if (!isSupabaseBrowserConfigured()) {
    throw new Error("Supabase env vars are missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.");
  }

  cachedClientPromise = import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }),
  );

  return cachedClientPromise;
}
