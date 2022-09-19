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
            <p>You're logged in as {user.name}</p>
            <Button
              as={Link}
              to="/account"
              colorScheme="blue"
              data-auth="account"
            >
              Account
            </Button>
            <Form action="/logout" method="post">
              <Button type="submit" data-auth="signout">
                Logout
              </Button>
            </Form>
          </>
        ) : (
          <div>
            <Button as={Link} to="/login" data-auth="login" colorScheme="blue">
              Log in
            </Button>
            <Button as={Link} to="/join" data-auth="signup">
              Sign up
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
