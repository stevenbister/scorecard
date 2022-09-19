import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Link as ChakraLink,
} from "@chakra-ui/react";
import type { ActionFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { createUserSession, getUserId } from "~/session.server";
import { createUser, getProfileByEmail } from "~/models/user.server";
import { validateEmail } from "~/utils";
import * as React from "react";

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

interface ActionData {
  errors: {
    email?: string;
    password?: string;
  };
}

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");

  // Ensure the email is valid
  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid." } },
      { status: 400 }
    );
  }

  // What if a user sends us a password through other means than our form?
  if (typeof password !== "string") {
    return json(
      { errors: { password: "Valid password is required." } },
      { status: 400 }
    );
  }

  // Enforce minimum password length
  if (password.length < 6) {
    return json<ActionData>(
      { errors: { password: "Password is too short." } },
      { status: 400 }
    );
  }

  // A user could potentially already exist within our system
  // and we should communicate that well
  const existingUser = await getProfileByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "A user already exists with this email." } },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;

  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const emailIsInvalid = actionData?.errors?.email ? true : false;
  const passwordIsInvalid = actionData?.errors?.password ? true : false;

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef?.current?.focus();
    }

    if (actionData?.errors?.password) {
      passwordRef?.current?.focus();
    }
  }, [actionData]);

  return (
    <div>
      <Form className="space-y-6" method="post" noValidate>
        <FormControl isInvalid={emailIsInvalid}>
          <FormLabel className="text-sm font-medium" htmlFor="email">
            <span>Email Address</span>
            {emailIsInvalid && (
              <FormErrorMessage
                className="block pt-1 text-red-700"
                id="email-error"
              >
                {actionData?.errors?.email}
              </FormErrorMessage>
            )}
          </FormLabel>
          <Input
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            type="email"
            name="email"
            id="email"
            required
            aria-invalid={emailIsInvalid ? true : undefined}
            aria-describedby="email-error"
            ref={emailRef}
          />
        </FormControl>

        <FormControl isInvalid={passwordIsInvalid}>
          <FormLabel className="text-sm font-medium" htmlFor="password">
            <span>Password</span>
            <FormHelperText>Must have at least 6 characters.</FormHelperText>
            {passwordIsInvalid && (
              <FormErrorMessage id="password-error">
                {actionData?.errors?.password}
              </FormErrorMessage>
            )}
          </FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            autoComplete="new-password"
            aria-invalid={passwordIsInvalid ? true : undefined}
            aria-describedby="password-error"
            ref={passwordRef}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Create Account
        </Button>

        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div>
          Already have an account?{" "}
          <ChakraLink
            as={Link}
            to={{
              pathname: "/login",
              search: searchParams.toString(),
            }}
          >
            Log in
          </ChakraLink>
        </div>
      </Form>
    </div>
  );
}
