import { WeatherInterface } from "../mongoose/weather/interface";
import { findByZip, updateByZip } from "../mongoose/weather/services";

// GraphQL field resolvers can return nulls from DB lookups; strip them before returning.
function compactData(items: Array<WeatherInterface | null>): WeatherInterface[] {
  return items.filter((item): item is WeatherInterface => item !== null);
}

export const resolvers = {
  Query: {
    weather: async (_: unknown, param: { zip: string }) => {
      const data = await findByZip(param.zip);
      // Schema returns a list, so wrap single lookup result in an array.
      return compactData([data]);
    },
  },
  Mutation: {
    weather: async (_: unknown, param: { data: Partial<WeatherInterface> & { zip: string } }) => {
      await updateByZip(param.data.zip, param.data);
      const data = await findByZip(param.data.zip);
      // Return updated record in list form to match mutation return type.
      return compactData([data]);
    },
  },
  LocationWeatherType: {
    friends: async (parent: WeatherInterface) => {
      if (!parent.friends?.length) return [];
      // "friends" is stored as zip strings; resolve each zip to a weather document.
      const friends = await Promise.all(parent.friends.map((zip) => findByZip(zip)));
      return compactData(friends);
    },
  },
};
