import { Container, Heading, List, ListItem, Stack } from "@chakra-ui/react";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AddPlayerModal from "~/components/addPlayerModal";
import PlayerCard from "~/components/playerCard";
import {
  addNewPlayer,
  deletePlayer,
  getAllPlayersByUserId,
} from "~/models/players.server";
import { getUser } from "~/session.server";
import type { definitions } from "~/types/supabase";

export const meta: MetaFunction = () => {
  return {
    title: "Players | Scorecard",
  };
};

type LoaderData = {
  players: definitions["players"] & {
    game_stats: definitions["game_stats"][];
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return redirect("/login");

  const players = await getAllPlayersByUserId(user.id);

  if (!players) return;

  return json({ players });
};

type ActionData = {
  newPlayerData: definitions["players"];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const userID = String(formData.get("id"));
  const playerID = String(formData.get("player_id"));
  const _action = formData.get("_action");

  if (_action === "CREATE") {
    const newPlayerData = await addNewPlayer({ id: userID, name });

    if (!newPlayerData) {
      throw new Response("Something went wrong adding a new player", {
        status: 500,
      });
    }

    return json<ActionData>({ newPlayerData });
  }

  if (_action === "DELETE") {
    await deletePlayer(playerID);

    return null;
  }
};

export default function Players() {
  const { players } = useLoaderData<LoaderData>();

  return (
    <Container>
      <Stack as="main" pt={16} spacing={6}>
        <Heading
          as="h1"
          size="3xl"
          color="purple.800"
          style={{ textAlign: "center" }}
        >
          Players
        </Heading>

        <Stack as={List} spacing={6}>
          {Array.isArray(players)
            ? players.map((player) => (
                <ListItem key={player.id}>
                  <PlayerCard player={player} />
                </ListItem>
              ))
            : null}
        </Stack>

        <AddPlayerModal />
      </Stack>
    </Container>
  );
}
