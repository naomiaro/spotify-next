import { useSession, getSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
      </>
    );
  }
  return <p>Access Denied</p>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
