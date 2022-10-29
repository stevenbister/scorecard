import { Button } from "@chakra-ui/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import PlayerDrawer from "~/components/playerDrawer";
import {
  addNewGame,
  addPlayersToGame,
  getCurrentGame,
  getPlayersInGame,
} from "~/models/games.server";
import { getAllPlayersByUserId } from "~/models/players.server";
import { createGameSession, getGameId, getUser } from "~/session.server";

type LoaderData = {};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const gameId = await getGameId(request);

  if (!user) return redirect("/login");
  if (!gameId) return redirect("/");

  const currentGame = await getCurrentGame(gameId);
  if (!currentGame) return redirect("/");

  const allSavedPlayers = await getAllPlayersByUserId(user.id);
  if (!allSavedPlayers) return;

  const playersInGame = await getPlayersInGame(gameId);
  if (!playersInGame) return;

  return json<LoaderData>({
    allSavedPlayers,
    currentGame,
    playersInGame,
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
      redirectTo: `/game/${game.id}`,
    });
  }

  if (_action === "ADD_PLAYER") {
    const gameId = await getGameId(request);

    await addPlayersToGame(gameId, { user_id: user.id, players: [...players] });

    return null;
  }
};

export default function Game() {
  const { allSavedPlayers, currentGame, playersInGame } = useLoaderData();
  const params = useParams();

  return (
    <>
      <Outlet />

      {params.id ? null : (
        <Link to={`/game/${currentGame.id}`}>Start Game</Link>
      )}

      <hr />

      <PlayerDrawer players={allSavedPlayers} playersInGame={playersInGame} />

      <Form action="/game/end-game" method="post">
        <Button type="submit">End Game</Button>
      </Form>
    </>
  );
}
