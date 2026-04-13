import { updateWishlist } from "@/mongoose/locations/services";
import { authGuard } from "@/middleware/auth-guards";
import { JWT } from "next-auth/jwt";

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

interface contextInterface {
  token: JWT | null;
}

export const locationMutations = {
  addWishlist: async (
    _: unknown,
    { location_id, user_id }: UpdateWishlistArgs,
    context: contextInterface,
  ) => {
    const guard = authGuard({ location_id, user_id }, context);

    if (guard !== true) {
      return guard;
    }

    return await updateWishlist({ locationId: location_id, userId: user_id, action: "add" });
  },
  removeWishlist: async (
    _: unknown,
    { location_id, user_id }: UpdateWishlistArgs,
    context: contextInterface,
  ) => {
    const guard = authGuard({ location_id, user_id }, context);

    if (guard !== true) {
      return guard;
    }

    return await updateWishlist({ locationId: location_id, userId: user_id, action: "remove" });
  },
};
