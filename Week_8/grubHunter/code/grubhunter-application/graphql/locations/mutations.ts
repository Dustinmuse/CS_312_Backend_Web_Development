import { updateWishlist } from "@/mongoose/locations/services";

export const MutationTypeDef = `
  type Mutation {
    addWishlist(location_id: String!, user_id: String!): Location
    removeWishlist(location_id: String!, user_id: String!): Location
  }
`;

interface UpdateWishlistArgs {
  location_id: string;
  user_id: string;
}

export const locationMutations = {
  addWishlist: async (_: any, { location_id, user_id }: UpdateWishlistArgs, context: any) => {
    return await updateWishlist({ locationId: location_id, userId: user_id, action: "add" });
  },
  removeWishlist: async (_: any, { location_id, user_id }: UpdateWishlistArgs, context: any) => {
    return await updateWishlist({ locationId: location_id, userId: user_id, action: "remove" });
  },
};
