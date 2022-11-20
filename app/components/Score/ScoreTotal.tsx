import { Text } from "@chakra-ui/react";

interface Props {
  score: number;
}

export default function Score({ score }: Props) {
  return <Text px={4}>Score: {score}</Text>;
}
