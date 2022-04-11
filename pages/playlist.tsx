import { GetServerSideProps } from "next";
import type { Session } from "next-auth";
import { useSession, getSession } from "next-auth/react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import usePlaylists, { getPlaylists } from "../lib/usePlaylists";

// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);
  if (session) {
    await queryClient.prefetchQuery("playlists", () =>
      getPlaylists(session.accessToken, session.sub)
    );
  }

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Page() {
  const { data: session } = useSession();
  const { data } = usePlaylists(session?.accessToken, session?.sub);

  return (
    <>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>

      <h2>Playlists</h2>
      <p>Current user playlists.</p>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}
