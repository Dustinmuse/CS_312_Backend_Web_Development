// SSR - Server-Side Rendering (uses getServerSideProps)
// Dynamic route that fetches fresh weather data on each request
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Weather.module.css";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface Props {
  weatherData: WeatherData;
  city: string;
  error?: string;
}

export default function Weather({ weatherData, city, error }: Props) {
  const router = useRouter();

  return (
    <>
      {/* Head sets page metadata for SEO */}
      <Head>
        <title>{`Weather - ${city}`}</title>
        <meta name="description" content={`Weather in ${city}`} />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Weather in {city.charAt(0).toUpperCase() + city.slice(1)}</h1>
          <Link href="/">
            <button className={styles.backBtn}>← Back Home</button>
          </Link>
        </div>

        {error ? (
          <p className={styles.error}>{error}</p>
        ) : weatherData ? (
          <div className={styles.weatherCard}>
            <div className={styles.temp}>{Math.round(weatherData.temperature)}°C</div>
            <p className={styles.condition}>{weatherData.condition}</p>
            <div className={styles.details}>
              <div>
                <span>Humidity:</span> {weatherData.humidity}%
              </div>
              <div>
                <span>Wind Speed:</span> {weatherData.windSpeed} km/h
              </div>
            </div>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { city } = context.params;

  try {
    // Call our own API endpoint during SSR
    const host = context.req?.headers?.host;
    const baseUrl = host ? `http://${host}` : "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/weather?city=${encodeURIComponent(city)}`);

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        props: {
          city,
          weatherData: null,
          error: data.error || "City not found",
        },
      };
    }

    return {
      props: {
        city: data.data.city,
        weatherData: {
          temperature: data.data.temperature,
          condition: data.data.condition,
          humidity: data.data.humidity,
          windSpeed: data.data.windSpeed,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        city,
        weatherData: null,
        error: "Failed to fetch weather data",
      },
    };
  }
}
