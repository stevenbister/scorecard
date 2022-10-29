import { Textarea } from "@chakra-ui/react";
import type { ChangeEventHandler } from "react";
import type { definitions } from "~/types/supabase";

interface Props {
  activePlayer: definitions["players"]["id"] | definitions["profiles"]["id"];
  onChange?: ChangeEventHandler;
}

export default function ScoreInput({ activePlayer, onChange }: Props) {
  return (
    <div>
      {activePlayer}
      <Textarea
        resize="vertical"
        onChange={onChange}
        data-active-player={activePlayer}
      />
    </div>
  );
}
