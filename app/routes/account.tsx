import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { updateProfileById } from "~/models/user.server";
import type { Errors, Status, UserProfile } from "~/types";
import { useUser } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Account",
  };
};

type ActionData = UserProfile | Status | Errors;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const name = formData.get("name");
  const id = formData.get("id");
  let status: Status = "PENDING";

  //  Ensure the user ID is present
  if (!id) {
    throw new Response("User ID is missing", {
      status: 500,
    });
  }

  //  Ensure the user ID is present
  if (!email) {
    throw new Response("User Email is missing", {
      status: 500,
    });
  }

  //  Update our user
  const updateProfile = await updateProfileById(id, {
    id,
    email,
    name,
  });

  if (updateProfile) {
    status = "SUCCESS";
  }

  return json({ updateProfile, status: status });
};

export default function Account() {
  const user = useUser();
  const actionData = useActionData() as ActionData;
  const [userName, setUserName] = useState(user.name);
  const toast = useToast();
  const toastId: string = "success-toast";

  //  Check our types
  const isTypeError = typeof actionData === "object" && "errors" in actionData;
  const isTypeStatus = typeof actionData === "object" && "status" in actionData;

  const emailRef = useRef<HTMLInputElement>(null);

  const emailIsInvalid =
    isTypeError && actionData?.errors?.email ? true : false;

  const handleChange = (e: FormEvent<EventTarget>, stateFn: Function) => {
    const target = e.target as HTMLInputElement;
    stateFn(target.value);
  };

  useEffect(() => {
    // @ts-ignore
    if (isTypeStatus && actionData.status === "SUCCESS") {
      if (!toast.isActive(toastId)) {
        // Prevent us open multiple toasts
        toast({
          id: toastId,
          title: "Profile updated.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    }
    // @ts-ignore
  }, [actionData?.status, isTypeStatus, toast]);

  useEffect(() => {
    if (isTypeError && actionData?.errors?.email) {
      emailRef?.current?.focus();
    }
  }, [actionData, isTypeError]);

  return (
    <>
      <Heading as="h1">Account</Heading>

      <Heading as="h2">Update your details</Heading>
      <Form method="post" noValidate>
        <FormControl isInvalid={emailIsInvalid}>
          <FormLabel>
            <span>Email Address</span>
            <FormHelperText>
              Speak to your administrator if you want to update your email
              address.
            </FormHelperText>
          </FormLabel>
          <Input
            autoComplete="email"
            type="email"
            name="email"
            id="email"
            aria-invalid={emailIsInvalid ? true : undefined}
            aria-describedby="email-error"
            ref={emailRef}
            value={user.email}
            readOnly
          />
        </FormControl>

        <FormControl>
          <FormLabel>
            <span>Name</span>
          </FormLabel>
          <Input
            type="text"
            name="name"
            id="name"
            value={userName}
            onChange={(e) => handleChange(e, setUserName)}
          />
        </FormControl>

        <input type="hidden" id="id" name="id" value={user.id} />

        <Button colorScheme="blue" type="submit">
          Update
        </Button>
      </Form>
    </>
  );
}
