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
    defaultValue: { input: "", score: 0 },
  });

  const handleScoreChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    const scoreArr = stringToArray(removeNewLine(value));
    const total = sumArray(arrayValuesToNumbers(scoreArr));

    setScore({
      input: value,
      score: total,
    });
  };

  return (
    <div key={player.id}>
      <ScoreInput
        player={player.id}
        value={score.input}
        onChange={handleScoreChange}
      />

      <ScoreTotal score={score.score} />
    </div>
  );
}
