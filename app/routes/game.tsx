import { Button, Container, Stack } from "@chakra-ui/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useParams,
  useSubmit,
} from "@remix-run/react";
import type { FormEvent } from "react";
import PlayerDrawer from "~/components/playerDrawer";
import { addNewGame, getCurrentGame } from "~/models/games.server";
import {
  addPlayersToGame,
  getAllPlayersByUserId,
  getPlayersInGame,
} from "~/models/players.server";
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
  const playerIds = formData.getAll("player");

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

    for (const playerId of playerIds) {
      await addPlayersToGame({ player_id: String(playerId), game_id: gameId });
    }

    return null;
  }
};

export default function Game() {
  const { allSavedPlayers, currentGame, playersInGame } = useLoaderData();
  const params = useParams();
  const submit = useSubmit();

  const handleEndGame = (e: FormEvent) => {
    e.preventDefault();

    const storedPlayers = [];

    for (const player of playersInGame) {
      const storedPlayer = window && localStorage.getItem(player.id);

      if (storedPlayer) {
        const storedPlayerJSON = JSON.parse(storedPlayer);

        storedPlayers.push(storedPlayerJSON);
      }

      window && localStorage.removeItem(player.id);
    }

    const winner = storedPlayers.reduce((acc, obj) => {
      if (!acc) {
        return null;
      }

      return acc.score > obj.score ? acc : obj;
    });

    // Clean up our localStorage
    submit(winner, { method: "post", action: "/game/end-game" });
  };

  return (
    <Container>
      <Stack spacing={6}>
        <Outlet />

        {params.id ? null : (
          <Link to={`/game/${currentGame.id}`}>Start Game</Link>
        )}

        <PlayerDrawer players={allSavedPlayers} playersInGame={playersInGame} />

        <Form onSubmit={handleEndGame}>
          <Button type="submit" style={{ width: "100%" }}>
            End Game
          </Button>
        </Form>
      </Stack>
    </Container>
  );
}
