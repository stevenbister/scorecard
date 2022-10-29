import { supabase } from "./supabaseClient.server";
import type { definitions } from "~/types/supabase";

export type User = { id: string; email: string };

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

export async function getPlayerById(id: string) {
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
    .eq("id", id)
    .single();

  if (error) return null;
  if (data) return data;
}
