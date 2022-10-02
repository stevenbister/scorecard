import type { definitions } from "~/types/supabase";
import { supabase } from "./supabaseClient.server";

export async function addNewGame(user_id: string) {
  const { data, error } = await supabase
    .from<definitions["games"]>("games")
    .insert({ players: [user_id], active: true })
    .single();

  if (error) {
    console.log(error);

    throw new Response(error.message, { status: 500 });
  }
  if (data) return data;
}

export async function getCurrentGame(id: string) {
  const { data, error } = await supabase
    .from<definitions["games"]>("games")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);

    throw new Response(error.message, { status: 500 });
  }
  if (data) return data;
}

export async function endGame(id: string) {
  const { data, error } = await supabase
    .from<definitions["games"]>("games")
    .update({ active: false })
    .match({ id: id });

  if (error) {
    console.error(error);
    throw new Response(error.message, { status: 500 });
  }

  if (data) {
    console.log(`Game ${id} ended!`);
    return data;
  }
}

export async function addPlayersToGame(
  id: string,
  {
    user_id,
    players,
  }: { user_id: string; players: string[] | FormDataEntryValue[] }
) {
  const { data, error } = await supabase
    .from<definitions["games"]>("games")
    .update({ players: [user_id, ...players] })
    .match({ id: id });

  if (error) {
    console.log(error);

    throw new Response(error.message, { status: 500 });
  }
  if (data) return data;
}
