import type { definitions, paths } from "~/types/supabase";
import { supabase } from "./supabaseClient.server";

export type User = { id: string; email: string };

export async function createUser(email: string, password: string) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // get the user profile after created
  const profile = await getProfileByEmail(user?.email);
  if (error) console.log(error);

  return profile;
}

export async function deleteUser(id: string) {
  // First delete the profile associated with the user
  const { data: profile, error: profileError } = await supabase
    .from<definitions["profiles"]>("profiles")
    .delete()
    .match({ id: id });
  // Then delete the user from our table
  const { data: user, error: userError } = await supabase.auth.api.deleteUser(
    id
  );

  if (profileError) {
    console.error(profileError);
    throw new Response(profileError.message, { status: 500 });
  } else if (userError) {
    console.error(userError);
    throw new Response(userError.message, { status: userError.status });
  }

  console.log(`User ${id} deleted!`);
  console.log(profile);
  return; // nothing to return eh?
}

export async function getProfileById(id: string) {
  const { data, error } = await supabase
    .from<definitions["profiles"]>("profiles")
    .select(
      `
      email,
      id,
      name,
      game_stats (
        wins,
        draws,
        losses
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);

    return null;
  }
  if (data) return data;
}

export async function getProfileByEmail(email?: string) {
  const { data, error } = await supabase
    .from<definitions["profiles"]>("profiles")
    .select("email, id, name")
    .eq("email", email)
    .single();

  if (error) return null;
  if (data) return data;
}

export async function updateProfileById(
  id: string,
  update: paths["/profiles"]["patch"]["parameters"]["query"]
) {
  const { data, error } = await supabase
    .from<definitions["profiles"]>("profiles")
    .update(update)
    .eq("id", id)
    .single();

  const { data: playerData, error: playerError } = await supabase
    .from<definitions["players"]>("players")
    .update({
      name: update.name,
    })
    .eq("id", id)
    .single();

  if (error || playerError) return null;
  if (data || playerData) return data;
}

export async function verifyLogin(email: string, password: string) {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) return undefined;
  const profile = await getProfileByEmail(user?.email);

  return profile;
}
