import { createClient } from "@supabase/supabase-js";
import invariant from "tiny-invariant";
import type { UserProfile } from "~/types";

export type User = { id: string; email: string };

// Abstract this away
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE; // Node only DO NOT EXPOSE TO FRONTEND

invariant(
  supabaseUrl,
  "SUPABASE_URL must be set in your environment variables."
);
invariant(
  supabaseAnonKey,
  "SUPABASE_ANON_KEY must be set in your environment variables."
);
invariant(
  supabaseServiceRole,
  "SUPABASE_SERVICE_ROLE must be set in your environment variables."
);

export const supabase = createClient(supabaseUrl, supabaseServiceRole);

export async function createUser(email: string, password: string) {
  const { user } = await supabase.auth.signUp({
    email,
    password,
  });

  // get the user profile after created
  const profile = await getProfileByEmail(user?.email);

  return profile;
}

export async function deleteUser(id: FormDataEntryValue | string) {
  // First delete the profile associated with the user
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .delete()
    .match({ id: id });
  // Then delete the user from our table
  const { data: user, error: userError } = await supabase.auth.api.deleteUser(
    id
  );

  if (profileError) {
    console.error(profileError);
    throw new Response(profileError.message, { status: profileError.status });
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
    .from("profiles")
    .select("email, id, name")
    .eq("id", id)
    .single();

  if (error) return null;
  if (data) return data;
}

export async function getProfileByEmail(email?: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("email, id, name")
    .eq("email", email)
    .single();

  if (error) return null;
  if (data) return data;
}

export async function updateProfileById(
  id: FormDataEntryValue,
  update: UserProfile
) {
  const { data, error } = await supabase
    .from("profiles")
    .update(update)
    .eq("id", id)
    .single();

  if (error) return null;
  if (data) return data;
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
