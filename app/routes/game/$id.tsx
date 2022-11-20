import { Grid, GridItem } from "@chakra-ui/react";
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
    <Grid
      templateAreas={`
        "playerList"
        "playerCards"
      `}
    >
      <PlayerList
        players={players}
        activePlayer={activePlayer}
        onChange={handleActivePlayerChange}
      />

      {players.map((player: definitions["players"]) => (
        <GridItem
          className={`score-input ${
            activePlayer === player.id ? "is-active" : ""
          }`}
          key={player.id}
          style={
            activePlayer === player.id
              ? { opacity: 1, visibility: "visible" }
              : { opacity: 0, visibility: "hidden" }
          }
          area="playerCards"
        >
          <Score player={player} />
        </GridItem>
      ))}
    </Grid>
  );
}
