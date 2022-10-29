import type { definitions } from "~/types/supabase";
import { getPlayerById } from "./players.server";
import { supabase } from "./supabaseClient.server";
import { getProfileById } from "./user.server";

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

export async function getPlayersInGame(id: string) {
  const { data, error } = await supabase
    .from<definitions["games"]>("games")
    .select("players")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  const playersInGame: object[] = [];

  await Promise.all(
    // @ts-ignore -- wtf?
    data?.players?.map(async (playerId: string) => {
      try {
        const u = await getProfileById(playerId); // user/profiles table
        const p = await getPlayerById(playerId); // players table

        if (u) {
          // @ts-ignore -- want to dynamically add the score object and that doesn't exist in our db
          u.score = 0;
          playersInGame.push(u);
        }

        if (p) {
          // @ts-ignore -- want to dynamically add the score object and that doesn't exist in our db
          p.score = 0;
          playersInGame.push(p);
        }

        return [p, u];
      } catch (error) {
        throw error;
      }
    })
  );

  return playersInGame;
}
