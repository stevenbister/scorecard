import { Stack, useRadioGroup } from "@chakra-ui/react";
import type { definitions } from "~/types/supabase";
import PlayerRadio from "../playerCard/PlayerRadio";

interface Props {
  players: definitions["players"][] | definitions["profiles"][];
  activePlayer: string;
  onChange: (nextValue: string) => void;
}

export default function PlayerList({ players, activePlayer, onChange }: Props) {
  const { getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: activePlayer,
    onChange: onChange,
  });

  return (
    <Stack {...getRootProps()} height="70vh" pt="18px">
      {Array.isArray(players) && players.length > 0
        ? players.map((player) => {
            return (
              <PlayerRadio
                key={player.id}
                player={player}
                {...getRadioProps({ value: player.id })}
              />
            );
          })
        : null}
    </Stack>
  );
}
