import { Avatar, Button, Stack, Text } from "@chakra-ui/react";
import { useFetcher } from "@remix-run/react";
import type { definitions } from "~/types/supabase";
import Table from "../table";

interface Props {
  player: definitions["players"] & {
    game_stats: definitions["game_stats"][];
  };
}

export default function PlayerCard({ player }: Props) {
  const fetcher = useFetcher();
  const { player_name, game_stats } = player;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Stack spacing={1}>
        <Avatar name={player_name} size="lg" />
        <Text textAlign="center">{player_name}</Text>
      </Stack>

      <Stack>
        <Table stats={game_stats[0]} />

        <fetcher.Form method="post" noValidate>
          <input
            type="hidden"
            id="player_id"
            name="player_id"
            value={player.id}
          />
          <input type="hidden" id="delete" name="_action" value="DELETE" />

          <Button size="sm" type="submit">
            Delete
          </Button>
        </fetcher.Form>
      </Stack>
    </Stack>
  );
}
