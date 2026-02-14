import { useState } from "react";
import type { WeatherInterface } from "../../mongoose/weather/interface";

export default function ForecastBanner({ zip, weather, tempC, tempF, friends }: WeatherInterface) {
  // Controls whether the nearby zip list is visible in the UI.
  const [showFriends, setShowFriends] = useState(false);

  return (
    <section aria-label="forecast-banner">
      <h2>Forecast for {zip}</h2>
      <p>
        {weather} | {tempC} / {tempF}
      </p>

      {/* Toggle nearby zip visibility without mutating props. */}
      <button onClick={() => setShowFriends((current) => !current)} type="button">
        {showFriends ? "Hide nearby zips" : "Show nearby zips"}
      </button>

      {showFriends ? (
        friends.length > 0 ? (
          // Render each related zip as a list item for easy querying in tests and accessibility tools.
          <ul aria-label="nearby-zips">
            {friends.map((friendZip) => (
              <li key={friendZip}>{friendZip}</li>
            ))}
          </ul>
        ) : (
          // Explicit empty state when there are no related zip codes.
          <p>No nearby zips found.</p>
        )
      ) : null}
    </section>
  );
}
