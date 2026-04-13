import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import Button from "@/components/button";
import styles from "./index.module.css";

const AuthElement = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.fdlst_private_userId;
  const isAuthenticated = status === "authenticated";

  if (!isAuthenticated || !userId) {
    return (
      <nav className={styles.root}>
        <Button variant="blue" clickHandler={() => signIn()}>
          Sign In
        </Button>
      </nav>
    );
  }

  return (
    <div className={styles.root}>
      <p className={styles.name}>{session?.user?.name}</p>
      <nav className={styles.actions}>
        <Button variant="outline">
          <Link href={`/list/${userId}`}>Your Wish List</Link>
        </Button>
        <Button variant="blue" clickHandler={() => signOut()}>
          Sign Out
        </Button>
      </nav>
    </div>
  );
};

export default AuthElement;
