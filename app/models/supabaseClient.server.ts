import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";

// Abstract this away
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE; // Node only DO NOT EXPOSE TO FRONTEND

invariant(
  supabaseUrl,
  "SUPABASE_URL must be set in your environment variables."
);
invariant(
  supabaseAnonKey,
  "SUPABASE_ANON_KEY must be set in your environment variables."
);
invariant(
  supabaseServiceRole,
  "SUPABASE_SERVICE_ROLE must be set in your environment variables."
);

export const supabase = createClient(supabaseUrl, supabaseServiceRole);
