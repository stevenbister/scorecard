import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import type { LinksFunction } from "@remix-run/node";
import type { ThrownResponse } from "@remix-run/react";
import styles from "./exceptionBoundary.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export function Error({ error }: { error: Error }) {
  return (
    <Box className="exception-boundary" pt={6}>
      <Container>
        <Stack>
          <Heading as="h1">Error</Heading>
          <pre>{error.message}</pre>
        </Stack>
      </Container>
    </Box>
  );
}

export function StatusError({
  status,
  text,
}: {
  status: ThrownResponse["status"];
  text: ThrownResponse["statusText"];
}) {
  return (
    <Box className="exception-boundary" pt={6}>
      <Container>
        <Stack>
          <Heading as="h1">{status}</Heading>
          <pre>{text}</pre>
        </Stack>
      </Container>
    </Box>
  );
}
