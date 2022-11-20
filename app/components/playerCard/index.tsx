import { Avatar, Button, Stack, Text } from "@chakra-ui/react";
import { useFetcher } from "@remix-run/react";
import type { definitions } from "~/types/supabase";
import { useUser } from "~/utils";
import Table from "../table";

interface Props {
  player: definitions["players"] & {
    name?: definitions["profiles"]["name"];
    game_stats: definitions["game_stats"][];
  };
}

export default function PlayerCard({ player }: Props) {
  const fetcher = useFetcher();
  const user = useUser();
  const { name, game_stats } = player;

  const isCurrentUser = user.id === player.id ? true : false;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Stack spacing={1}>
        <Avatar name={name} size="lg" />
        <Text textAlign="center">{name}</Text>
      </Stack>

      <Stack>
        <Table stats={game_stats[0]} />

        {/* Only show our delete option if the player isn't the current user */}
        {!isCurrentUser ? (
          <fetcher.Form method="post" noValidate>
            <input
              type="hidden"
              id="player_id"
              name="player_id"
              value={player.id}
            />
            <input type="hidden" id="delete" name="_action" value="DELETE" />

            <Button
              size="sm"
              type="submit"
              data-cy={`Delete ${player.name}`}
              isLoading={
                fetcher.state === "submitting" || fetcher.state === "loading"
              }
            >
              Delete
            </Button>
          </fetcher.Form>
        ) : null}
      </Stack>
    </Stack>
  );
}
