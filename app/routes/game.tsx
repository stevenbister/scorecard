import { Button } from "@chakra-ui/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import PlayerDrawer from "~/components/playerDrawer";
import {
  addNewGame,
  addPlayersToGame,
  getCurrentGame,
} from "~/models/games.server";
import { getAllPlayersByUserId } from "~/models/players.server";
import { createGameSession, getGameId, getUser } from "~/session.server";

type LoaderData = {};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const gameId = await getGameId(request);

  if (!user) return redirect("/login");
  if (!gameId) return redirect("/");

  console.log(gameId);

  const currentGame = await getCurrentGame(gameId);

  const players = await getAllPlayersByUserId(user.id);
  if (!players) return;

  return json<LoaderData>({
    players,
    currentGame,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const _action = formData.get("_action");
  const players = formData.getAll("player");

  const user = await getUser(request);
  if (!user) return redirect("/login");

  if (_action === "CREATE_GAME") {
    const game = await addNewGame(user.id);

    if (!game)
      throw new Response("Something went wrong creating the game!", {
        status: 500,
      });

    return createGameSession({
      request,
      gameId: game.id,
      redirectTo: "/game",
    });
  }

  if (_action === "ADD_PLAYER") {
    const gameId = await getGameId(request);

    await addPlayersToGame(gameId, { user_id: user.id, players: [...players] });

    return null;
  }
};

export default function Game() {
  const { players, currentGame } = useLoaderData();
  return (
    <>
      <pre>{JSON.stringify(currentGame, null, 4)}</pre>
      <PlayerDrawer players={players} playersInGame={currentGame.players} />

      <Form action="/game/end-game" method="post">
        <Button type="submit">End Game</Button>
      </Form>
    </>
  );
}
