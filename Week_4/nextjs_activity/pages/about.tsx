// SSG - Static Site Generation (uses getStaticProps)
// Pre-generated at build time, revalidated daily
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/About.module.css";

export default function About() {
  return (
    <>
      {/* Head sets page metadata for SEO */}
      <Head>
        <title>About - Weather App</title>
        <meta name="description" content="About our Weather Application" />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>About Weather App</h1>
          <Link href="/">
            <button className={styles.backBtn}>← Back Home</button>
          </Link>
        </div>

        <div className={styles.content}>
          <h2>What is This App?</h2>
          <p>
            This is a simple weather application built with Next.js. It uses the free Open-Meteo API
            to fetch real-time weather data for any city in the world.
          </p>

          <h2>Features</h2>
          <ul>
            <li>Search weather by city name</li>
            <li>View temperature, humidity, and wind speed</li>
            <li>Fast and responsive design</li>
            <li>Built with Next.js and React</li>
          </ul>

          <h2>About the API</h2>
          <p>
            Weather data is provided by{" "}
            <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">
              Open-Meteo
            </a>
            , a free weather API that requires no authentication.
          </p>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Static generation for the About page
  return {
    props: {},
    revalidate: 86400, // Revalidate once per day
  };
}
