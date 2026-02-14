import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { storeDocument } from "../mongoose/weather/services";

let memoryServer: MongoMemoryServer | null = null;
let connectionPromise: Promise<typeof mongoose> | null = null;
let isSeeded = false;

async function seedWeatherData(): Promise<void> {
  if (isSeeded) return;

  await storeDocument({
    zip: "96815",
    weather: "sunny",
    tempC: "25C",
    tempF: "70F",
    friends: ["96814", "96826"],
  });
  await storeDocument({
    zip: "96814",
    weather: "rainy",
    tempC: "20C",
    tempF: "68F",
    friends: ["96815", "96826"],
  });
  await storeDocument({
    zip: "96826",
    weather: "rainy",
    tempC: "30C",
    tempF: "86F",
    friends: ["96815", "96814"],
  });

  isSeeded = true;
}

async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    await seedWeatherData();
    return;
  }

  if (!memoryServer) {
    memoryServer = await MongoMemoryServer.create();
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(memoryServer.getUri(), {
      dbName: "Weather",
    });
  }

  await connectionPromise;
  await seedWeatherData();
}
export default dbConnect;
