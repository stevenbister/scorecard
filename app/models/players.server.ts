import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";
import type { definitions } from "~/types/supabase";

export type User = { id: string; email: string };

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

export async function addNewPlayer({ id, name }: { id: string; name: string }) {
  const { data, error } = await supabase
    .from<definitions["players"]>("players")
    .insert([
      {
        user_id: id,
        player_name: name,
      },
    ])
    .single();

  if (error) {
    console.log(error);

    return null;
  }
  if (data) return data;
}

export async function deletePlayer(id: string) {
  const { data, error } = await supabase
    .from<definitions["players"]>("players")
    .delete()
    .match({ id: id });

  if (error) {
    console.error(error);
    throw new Response(error.message, { status: 500 });
  }

  console.log(`Player ${id} deleted!`);
  return; // nothing to return eh?
}

export async function getAllPlayersByUserId(id: string) {
  const { data, error } = await supabase
    .from<definitions["players"]>("players")
    .select(
      `
      *,
      game_stats (
        wins,
        draws,
        losses
      )
    `
    )
    .eq("user_id", id);

  if (error) return null;
  if (data) return data;
}
