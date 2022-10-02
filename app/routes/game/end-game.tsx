import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { endGame } from "~/models/games.server";
import { destroyGameSession, getGameId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const gameId = await getGameId(request);

  await endGame(gameId);

  return destroyGameSession(request);
};

export default function EndGame() {
  return redirect("/");
}
