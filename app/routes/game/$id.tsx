import { SimpleGrid } from "@chakra-ui/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { getAllActiveGameIds } from "~/models/games.server";
import {
  arrayValuesToNumbers,
  removeNewLine,
  stringToArray,
  sumArray,
  usePlayers,
  useUser,
} from "~/utils";
import PlayerList from "~/components/playerList";
import ScoreInput from "~/components/Score/ScoreInput";
import ScoreTotal from "~/components/Score/ScoreTotal";

type LoaderData = {};

export const loader: LoaderFunction = async ({ request, params }) => {
  const activeGames = await getAllActiveGameIds();
  const isLiveGame = activeGames?.find((game) => game.id === params.id);

  if (!isLiveGame) throw new Response("Game ID isn't active", { status: 404 });

  return json<LoaderData>({});
};

export default function GameID() {
  const user = useUser();
  const players = usePlayers();
  const [activePlayer, setActivePlayer] = useState(user.id); // default to the current user
  const [score, setScore] = useState(0);

  const handleActivePlayerChange = (v: string) => {
    setActivePlayer(v);
  };

  const handleScoreChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    const scoreArr = stringToArray(removeNewLine(value));
    const total = sumArray(arrayValuesToNumbers(scoreArr));
    setScore(total || 0);
  };

  return (
    <>
      <SimpleGrid columns={2}>
        <div>
          <ScoreInput
            activePlayer={activePlayer}
            onChange={handleScoreChange}
          />
          <ScoreTotal activePlayer={activePlayer} score={score} />
        </div>

        <PlayerList
          players={players}
          activePlayer={activePlayer}
          onChange={handleActivePlayerChange}
        />
      </SimpleGrid>
    </>
  );
}