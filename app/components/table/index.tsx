import {
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { definitions } from "~/types/supabase";

export interface Props {
  stats: definitions["game_stats"];
}

export default function Table({ stats }: Props) {
  const statHeaders = [];
  const statItems = [];

  for (const value in stats) {
    if (Object.prototype.hasOwnProperty.call(stats, value)) {
      statHeaders.push({ value });
      statItems.push({
        key: value,
        stats: stats[value as keyof Props["stats"]],
      });
    }
  }

  return (
    <ChakraTable variant="unstyled" size="sm">
      <Thead>
        <Tr>
          {statHeaders.map((header) => (
            <Th key={header.value}>{header.value}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          {statItems.map((item) => (
            <Td key={item.key}>{item.stats}</Td>
          ))}
        </Tr>
      </Tbody>
    </ChakraTable>
  );
}
