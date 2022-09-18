import { Button } from "@chakra-ui/react";
import { Form, Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <main>
      <div>
        {user ? (
          <>
            <p>You're logged in as {user.email}</p>
            <Form action="/logout" method="post">
              <Button type="submit">Logout</Button>
            </Form>
          </>
        ) : (
          <div>
            <Button as={Link} to="/login" colorScheme="blue">
              Log in
            </Button>
            <Button as={Link} to="/join">
              Sign up
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
