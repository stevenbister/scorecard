import {
  Button,
  Checkbox,
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
import React from "react";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { validateEmail } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Login",
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
      <Form method="post" noValidate>
        <FormControl>
          <FormLabel htmlFor="email">
            <span>Email Address</span>
            {actionData?.errors?.email && (
              <FormErrorMessage id="email-error">
                {actionData?.errors?.email}
              </FormErrorMessage>
            )}
          </FormLabel>
          <Input
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            autoComplete="email"
            type="email"
            name="email"
            id="email"
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
            ref={emailRef}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">
            <span>Password</span>
            <FormHelperText>Must have at least 6 characters.</FormHelperText>
            {actionData?.errors?.password && (
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
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
            ref={passwordRef}
          />
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Log in
        </Button>

        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div>
          <FormControl>
            <Checkbox id="remember" name="remember" type="checkbox">
              Remember me
            </Checkbox>
          </FormControl>

          <div>
            Don't have an account?{" "}
            <ChakraLink as={Link} to={{ pathname: "/join" }}>
              Sign up
            </ChakraLink>
          </div>
        </div>
      </Form>
    </div>
  );
}
