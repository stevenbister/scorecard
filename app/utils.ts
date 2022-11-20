import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import type { User } from "./models/user.server";

export function useMatchesData(id: string) {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
}

export function isUser(user: User) {
  return user && typeof user === "object";
}

export function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function usePlayers() {
  const data = useMatchesData("routes/game");
  if (!data) {
    throw new Error("No players found in games loader.");
  }

  return data.playersInGame;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const removeNewLine = (str: string) => {
  // replace any new lines and any whitespace
  return str.replace(/\n/g, " ").replace(/\s+/g, " ");
};

export const stringToArray = (str: string) => {
  const array = str.trim().split(" ");

  // If the first item in the array is empty then remove it
  // Fixes an issue in FireFox where empty first item was getting added
  if (Array.isArray(array) && array[0] === "") {
    array.shift();
  }

  return array;
};

export const arrayValuesToNumbers = (arr: string[]) => {
  return arr.map((value) => Number(value));
};

export const sumArray = (arr: number[]) => {
  if (arr.length <= 0) return 0;

  const result = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  // Catch NaN value and return 0 as a nice output for the user
  if (isNaN(result)) return 0;

  return result;
};
