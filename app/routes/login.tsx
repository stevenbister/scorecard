import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { ActionFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import React from "react";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import type { Errors } from "~/types";
import { validateEmail } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Login | Scorecard",
  };
};

type ActionData = Errors;

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
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json({ errors: { email: "Email is invalid." } }, { status: 400 });
  }

  if (typeof password !== "string") {
    return json(
      { errors: { password: "Valid password is required." } },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return json(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";

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
    <Container>
      <Stack as="main" pt={16}>
        <Heading
          as="h1"
          size="3xl"
          color="purple.800"
          style={{ textAlign: "center" }}
        >
          Sign in
        </Heading>

        <Stack pt={12} spacing={6}>
          <Stack as={Form} method="post" noValidate spacing={4}>
            <FormControl isInvalid={emailIsInvalid}>
              <FormLabel htmlFor="email">
                <Text as="b" color="purple.800">
                  Email
                </Text>
                {emailIsInvalid && (
                  <FormErrorMessage id="email-error">
                    {actionData?.errors?.email}
                  </FormErrorMessage>
                )}
              </FormLabel>
              <Input
                autoComplete="email"
                type="email"
                name="email"
                id="email"
                aria-invalid={emailIsInvalid ? true : undefined}
                aria-describedby="email-error"
                ref={emailRef}
              />
            </FormControl>

            <FormControl isInvalid={passwordIsInvalid}>
              <FormLabel htmlFor="password">
                <Text as="b" color="purple.800">
                  Password
                </Text>
                <FormHelperText>
                  Must have at least 6 characters.
                </FormHelperText>
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
                autoComplete=""
                aria-invalid={passwordIsInvalid ? true : undefined}
                aria-describedby="password-error"
                ref={passwordRef}
              />
            </FormControl>

            <FormControl>
              <Checkbox
                id="remember"
                name="remember"
                type="checkbox"
                colorScheme="purple"
              >
                Remember me
              </Checkbox>
            </FormControl>

            <Button colorScheme="purple" type="submit">
              Log in
            </Button>

            <input type="hidden" name="redirectTo" value={redirectTo} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
