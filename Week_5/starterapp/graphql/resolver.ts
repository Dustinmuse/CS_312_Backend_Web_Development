import { WeatherInterface } from "../mongoose/weather/interface";
import { findByZip, updateByZip } from "../mongoose/weather/services";

type WeatherResult = WeatherInterface & { advisory?: string | null };

function compactData(items: Array<WeatherResult | null>): WeatherResult[] {
  return items.filter((item): item is WeatherResult => item !== null);
}

export const resolvers = {
  Query: {
    weather: async (_: unknown, param: { zip: string }) => {
      const data = await findByZip(param.zip);
      return compactData([data]);
    },
  },
  Mutation: {
    weather: async (_: unknown, param: { data: Partial<WeatherInterface> & { zip: string } }) => {
      await updateByZip(param.data.zip, param.data);
      const data = await findByZip(param.data.zip);
      return compactData([data]);
    },
  },
  LocationWeatherType: {
    friends: async (parent: WeatherResult) => {
      if (!parent.friends?.length) return [];
      const friends = await Promise.all(parent.friends.map((zip) => findByZip(zip)));
      return compactData(friends);
    },
  },
};
