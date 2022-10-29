import type { definitions } from "~/types/supabase";
import { createClient } from "@supabase/supabase-js";
import testUser from "../fixtures/user.json";
import testPlayers from "../fixtures/players.json";

const supabaseUrl = Cypress.env("SUPABASE_URL");
const supabaseServiceRole = Cypress.env("SUPABASE_SERVICE_ROLE");

const supabase = createClient(supabaseUrl, supabaseServiceRole);

async function getUserID() {
  // Find the seeded user ID so we can assign it to the players we seed
  const { data: users } = await supabase.auth.api.listUsers();
  const userID = users?.find((user) => user.email == testUser.email)?.id;

  return userID;
}

async function getPlayers() {
  const { data: players } = await supabase.from("players").select("*");

  return players;
}

export async function seedUser() {
  const { data: users } = await supabase.auth.api.listUsers();

  const userExists = users?.find((user) => user.email == testUser.email)
    ? true
    : false;

  if (!userExists) {
    console.log("Seeding test user...");

    const { data, error } = await supabase.auth.api.createUser({
      password: testUser.password,
      email: testUser.email,
      email_confirm: true,
    });

    // Seed the username
    const { data: profile } = await supabase
      .from("profiles")
      .update({ name: testUser.name })
      .eq("email", testUser.email);

    if (error) console.error(error);
    if (data) console.log({ "Seeded user": data, profile });
  }
}

export async function cleanUpUser() {
  Cypress.log({
    name: "Restore user defaults",
  });

  const { data, error } = await supabase
    .from("profiles")
    .update({
      email: testUser.email,
      name: testUser.name,
    })
    .eq("email", testUser.email)
    .single();

  if (error) console.error(error);
  if (data) console.log({ "restored data": data });
}

export async function seedPlayers() {
  Cypress.log({
    name: "Seed players",
  });

  // Find the seeded user ID so we can assign it to the players we seed
  const userID = await getUserID();

  testPlayers.forEach(async (player) => {
    console.log(`creating player ${player.name}...`);

    const { data, error } = await supabase
      .from<definitions["players"]>("players")
      .insert({
        user_id: userID,
        name: player.name,
      })
      .single();

    if (error) console.log(error);

    if (data) {
      console.log(`${player.name} seeded`);
      return data;
    }
  });
}

export async function cleanUpPlayers() {
  Cypress.log({
    name: "Clean up players",
  });

  const userID = await getUserID();
  const players = await getPlayers();

  players?.forEach(async (player) => {
    console.log(`removing player ${player.name} from db...`);

    const { data, error } = await supabase
      .from<definitions["players"]>("players")
      .delete()
      .match({ user_id: userID });

    if (error) console.log(error);

    if (data) {
      console.log(`${player.name} removed`);
      return data;
    }
  });
}

export async function cleanUpGames() {
  Cypress.log({
    name: "Clean up games",
  });

  const userID = await getUserID();

  const { data, error } = await supabase
    .from<definitions["games"]>("games")
    .delete()
    .contains("players", [userID]);

  if (error) console.log(error);

  if (data) {
    console.log(`Removed game ${data}`);
    return data;
  }
}
