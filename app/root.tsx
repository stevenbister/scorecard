import { ChakraProvider } from "@chakra-ui/react";
import { withEmotionCache } from "@emotion/react";
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import type { definitions } from "./types/supabase";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import React, { useContext, useEffect } from "react";

import { ClientStyleContext, ServerStyleContext } from "./context";
import { getUser } from "./session.server";
import Header, { links as headerLinks } from "./components/header";
import {
  Error,
  StatusError,
  links as exceptionBoundaryLinks,
} from "./components/exceptionBoundary/Error";

export const meta: MetaFunction = () => {
  return {
    title: "Scorecard",
    viewport: "width=device-width,initial-scale=1",
  };
};

export let links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
    ...headerLinks(),
    ...exceptionBoundaryLinks(),
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

type LoaderData = {
  user?: definitions["profiles"] | null;
};

export async function loader({ request }: LoaderArgs) {
  return json<LoaderData>({
    user: await getUser(request),
  });
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <ChakraProvider>
        <Header />
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document>
      <ChakraProvider>
        <Header />
        <StatusError status={caught.status} text={caught.statusText} />
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document>
      <ChakraProvider>
        <Header />
        <Error error={error} />
      </ChakraProvider>
    </Document>
  );
}
