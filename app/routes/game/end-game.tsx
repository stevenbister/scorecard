import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { endGame, setWinner } from "~/models/games.server";
import { destroyGameSession, getGameId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const winnerId = String(formData.get("id"));
  const score = Number(formData.get("score"));

  const gameId = await getGameId(request);

  if (score > 0) {
    await setWinner(gameId, winnerId);
  }

  await endGame(gameId);

  return destroyGameSession(request);
};

export default function EndGame() {
  return redirect("/");
}
