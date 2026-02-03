// SSG - Static Site Generation (default, no data fetching)
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      {/* Head sets page metadata for SEO */}
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Simple Weather Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* Optimized Next.js image */}
          <Image src="/weather-icon.svg" alt="Weather icon" width={100} height={100} priority />
          <h1>Weather App</h1>
          <p>Check the weather in any city!</p>

          {/* Client-side navigation with Link */}
          <nav className={styles.nav}>
            <Link href="/">
              <button className={styles.btn}>Home</button>
            </Link>
            <Link href="/weather/new-york">
              <button className={styles.btn}>Weather (NYC)</button>
            </Link>
            <Link href="/about">
              <button className={styles.btn}>About</button>
            </Link>
          </nav>
        </main>
      </div>
    </>
  );
}
