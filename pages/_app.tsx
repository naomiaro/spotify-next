import "../styles/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default App;
