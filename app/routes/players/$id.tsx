import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPlayerById } from "~/models/players.server";
import { getProfileById } from "~/models/user.server";
import type { definitions } from "~/types/supabase";

type ActionData = {
  activePlayer: definitions["players"]["id"] | definitions["profiles"]["id"];
  score: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!params.id) return null;

  const user = await getProfileById(params.id);
  const player = await getPlayerById(params.id);

  if (!user?.id && !player?.id) return null;

  const formData = await request.formData();
  const activePlayer = String(formData.get("activePlayer"));
  const score = String(formData.get("score"));

  return json<ActionData>({
    activePlayer,
    score,
  });
};
