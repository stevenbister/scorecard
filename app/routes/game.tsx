import { Button } from "@chakra-ui/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { addNewGame } from "~/models/games.server";
import { createGameSession, getGameId, getUser } from "~/session.server";

type LoaderData = {};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const gameId = await getGameId(request);

  if (!user) return redirect("/login");
  if (!gameId) return redirect("/");

  return json<LoaderData>({
    user,
    gameId,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");

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
};

export default function Game() {
  const loader = useLoaderData();
  return (
    <>
      <pre>{JSON.stringify(loader, null, 4)}</pre>

      <Form action="/game/end-game" method="post">
        <Button type="submit">End Game</Button>
      </Form>
    </>
  );
}
