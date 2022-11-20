import { Textarea } from "@chakra-ui/react";
import type { ChangeEventHandler } from "react";

interface Props {
  value: string;
  onChange?: ChangeEventHandler;
}

export default function ScoreInput({ value, onChange }: Props) {
  return <Textarea resize="vertical" onChange={onChange} value={value} />;
}
