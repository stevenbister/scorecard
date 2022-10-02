import { Button, Container, Heading, Stack } from "@chakra-ui/react";
import { Form, Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  return (
    <Container>
      <Stack as="main" pt={32}>
        <Heading
          as="h1"
          size="3xl"
          color="purple.800"
          style={{ textAlign: "center" }}
        >
          Scorecard
        </Heading>
        {user ? (
          <Stack pt={16} spacing={6}>
            <Form method="post" action="/game">
              <Button type="submit" colorScheme="purple">
                Start a game
              </Button>
            </Form>
          </Stack>
        ) : (
          <Stack pt={16} spacing={6}>
            <Button
              as={Link}
              to="/login"
              data-auth="login"
              colorScheme="purple"
            >
              Log in
            </Button>
            <Button as={Link} to="/join" variant="outline" data-auth="signup">
              Sign up
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
