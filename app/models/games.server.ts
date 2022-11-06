import type { definitions } from "~/types/supabase";
import { supabase } from "./supabaseClient.server";

export async function addNewGame(user_id: string) {
  const { data: game, error } = await supabase
    .from<definitions["games"]>("games")
    .insert({ active: true })
    .single();

  if (error) {
    console.log(error);

    throw new Response(error.message, { status: 500 });
  }

  // Add the current user to the game as soon as it starts
  const { error: playerError } = await supabase
    .from<definitions["players"]>("players")
    .update({ game_id: game.id })
    .eq("id", user_id) // if ID is equal to user ID
    .single();

  if (playerError) {
    console.log(error);

    throw new Response(playerError.message, { status: 500 });
  }

  if (game) return game;
}

export async function getAllActiveGameIds() {
  const { data, error } = await supabase
    .from<definitions["games"]>("games")
    .select("id")
    .eq("active", true);

  if (error) {
    console.error(error);

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

export async function setWinner(game_id: string, winner_id: string) {
  const { data, error } = await supabase
    .from<definitions["games"]>("games")
    .update({ winner: winner_id })
    .match({ id: game_id });

  if (error) {
    console.error(error);
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
