// API Route - Server-side endpoint for fetching weather data
// Called by the SSR weather page and can be used directly via HTTP requests
import type { NextApiRequest, NextApiResponse } from "next";

interface WeatherResponse {
  success: boolean;
  data?: {
    city: string;
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<WeatherResponse>) {
  const { city } = req.query;

  // Validate query parameter
  if (!city || typeof city !== "string") {
    return res.status(400).json({
      success: false,
      error: "City parameter is required",
    });
  }

  try {
    // Normalize slug format like "new-york" -> "new york"
    const normalizedCity = decodeURIComponent(city).replace(/[-_]+/g, " ").trim();

    // Open-Meteo Geocoding API to get coordinates
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(normalizedCity)}&count=1&language=en&format=json`,
    );

    if (!geoResponse.ok) {
      return res.status(502).json({
        success: false,
        error: "Failed to fetch location data",
      });
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({
        success: false,
        error: "City not found",
      });
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Fetch current weather using coordinates
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius`,
    );

    if (!weatherResponse.ok) {
      return res.status(502).json({
        success: false,
        error: "Failed to fetch weather data",
      });
    }

    const weatherData = await weatherResponse.json();

    if (!weatherData.current) {
      return res.status(502).json({
        success: false,
        error: "Invalid weather data received",
      });
    }

    const current = weatherData.current;
    const weatherCode = current.weather_code;

    // Map numeric weather codes to readable text
    const conditions: { [key: number]: string } = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      61: "Slight rain",
      80: "Slight rain showers",
    };

    return res.status(200).json({
      success: true,
      data: {
        city: name,
        temperature: current.temperature_2m,
        condition: conditions[weatherCode] || "Unknown",
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch weather data",
    });
  }
}
