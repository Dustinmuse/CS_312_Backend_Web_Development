import { db } from "./data";

interface WeatherInterface {
  zip: string;
  weather: string;
  tempC: string;
  tempF: string;
  friends: string[];
  advisory?: string | null;
}

export const resolvers = {
  Query: {
    weather: async (_: any, param: WeatherInterface) => {
      const match = db.find((item) => item.zip === param.zip);
      return match ? [match] : [];
    },
  },
  Mutation: {
    weather: async (_: any, param: { data: WeatherInterface }) => {
      const match = db.find((item) => item.zip === param.data.zip);
      return match ? [match] : [];
    },
  },
  LocationWeatherType: {
    friends: (parent: WeatherInterface) => {
      return parent.friends
        .map((zip) => db.find((item) => item.zip === zip))
        .filter((item): item is WeatherInterface => Boolean(item));
    },
  },
};
