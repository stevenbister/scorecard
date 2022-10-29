import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useFetcher } from "@remix-run/react";
import type { definitions } from "~/types/supabase";

interface Props {
  players: definitions["players"][] | definitions["profiles"][];
  activePlayer: string;
  onChange: (nextValue: string) => void;
}

export default function PlayerList({ players, activePlayer, onChange }: Props) {
  const fetcher = useFetcher();

  return (
    <Stack as={fetcher.Form}>
      <RadioGroup onChange={onChange} value={activePlayer}>
        {Array.isArray(players) && players.length > 0
          ? players.map((player) => {
              return (
                <Radio key={player.id} value={player.id}>
                  {player?.name}
                </Radio>
              );
            })
          : null}
      </RadioGroup>
    </Stack>
  );
}
