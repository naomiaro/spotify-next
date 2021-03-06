import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>NextAuth.js Spotify example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome,{" "}
          {session.status === "authenticated"
            ? session.data.user?.name || "friend"
            : "stranger"}
          !
        </h1>
        <p>
          {session.status === "authenticated" ? (
            <button
              className={styles.button}
              type="button"
              onClick={() => signOut()}
            >
              Sign out {session.data.user?.email}
            </button>
          ) : (
            <button
              className={styles.button}
              type="button"
              style={{ "--accent-color": "#15883e" }}
              onClick={() => signIn("spotify")}
              disabled={session.status === "loading"}
            >
              Sign in with Spotify
            </button>
          )}
        </p>
      </main>
    </div>
  );
};

export default Home;
