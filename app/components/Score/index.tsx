import { Stack } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import useLocalStorageState from "use-local-storage-state";
import type { definitions } from "~/types/supabase";
import {
  arrayValuesToNumbers,
  removeNewLine,
  stringToArray,
  sumArray,
} from "~/utils";
import ScoreInput from "./ScoreInput";
import ScoreTotal from "./ScoreTotal";

interface Props {
  player: definitions["players"];
}

export default function Score({ player }: Props) {
  const [score, setScore] = useLocalStorageState(player.id, {
    defaultValue: { id: player.id, input: "", score: 0 },
  });

  const handleScoreChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    const scoreArr = stringToArray(removeNewLine(value));
    const total = sumArray(arrayValuesToNumbers(scoreArr));

    setScore({
      id: player.id,
      input: value,
      score: total,
    });
  };

  return (
    <Stack key={player.id} height="100%" pt="24px">
      <ScoreInput value={score.input} onChange={handleScoreChange} />

      <ScoreTotal score={score.score} />
    </Stack>
  );
}
