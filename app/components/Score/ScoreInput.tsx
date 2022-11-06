import { Textarea } from "@chakra-ui/react";
import type { ChangeEventHandler } from "react";
import type { definitions } from "~/types/supabase";

interface Props {
  player: definitions["players"]["id"] | definitions["profiles"]["id"];
  value: string;
  onChange?: ChangeEventHandler;
}

export default function ScoreInput({ player, value, onChange }: Props) {
  return (
    <div>
      {player}
      <Textarea resize="vertical" onChange={onChange} value={value} />
    </div>
  );
}
