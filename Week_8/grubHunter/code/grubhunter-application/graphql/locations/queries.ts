import {
  findAllLocations,
  findLocationsById,
  findWishlistLocations,
} from "@/mongoose/locations/services";

export const QueryTypeDef = `
  type Query {
    allLocations: [Location]
    locationsById(location_ids: String!): [Location]
    onUserWishlist(user_id: String!): [Location]
  }
`;

export const locationQueries = {
  allLocations: async () => {
    return await findAllLocations();
  },
  locationsById: async (_: unknown, { location_ids }: { location_ids: string }) => {
    return await findLocationsById({ locationId: location_ids });
  },
  onUserWishlist: async (_: unknown, { user_id }: { user_id: string }) => {
    return await findWishlistLocations({ userId: user_id });
  },
};
