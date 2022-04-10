import { useSession } from "next-auth/react";

export default function MePage() {
  const { data } = useSession();

  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
