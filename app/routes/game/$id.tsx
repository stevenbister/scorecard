import { SimpleGrid } from "@chakra-ui/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState } from "react";
import PlayerList from "~/components/playerList";
import Score from "~/components/Score";
import { getAllActiveGameIds } from "~/models/games.server";
import type { definitions } from "~/types/supabase";
import { usePlayers, useUser } from "~/utils";

type LoaderData = {};

export const loader: LoaderFunction = async ({ params }) => {
  const activeGames = await getAllActiveGameIds();
  const isLiveGame = activeGames?.find((game) => game.id === params.id);

  if (!isLiveGame) throw new Response("Game ID isn't active", { status: 404 });

  return json<LoaderData>({});
};

export default function GameID() {
  const user = useUser();
  const players = usePlayers();
  const [activePlayer, setActivePlayer] = useState(user.id); // default to the current user

  const handleActivePlayerChange = (playerId: string) =>
    setActivePlayer(playerId);

  return (
    <>
      <PlayerList
        players={players}
        activePlayer={activePlayer}
        onChange={handleActivePlayerChange}
      />

      <SimpleGrid columns={2}>
        {players.map((player: definitions["players"]) => (
          <Score player={player} key={player.id} />
        ))}
      </SimpleGrid>
    </>
  );
}
