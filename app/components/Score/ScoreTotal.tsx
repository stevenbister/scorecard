import { Text } from "@chakra-ui/react";
import type { definitions } from "~/types/supabase";

interface Props {
  activePlayer: definitions["players"]["id"] | definitions["profiles"]["id"];
  score: number;
}

export default function Score({ activePlayer, score }: Props) {
  return <Text data-active-player={activePlayer}>Score: {score}</Text>;
}
