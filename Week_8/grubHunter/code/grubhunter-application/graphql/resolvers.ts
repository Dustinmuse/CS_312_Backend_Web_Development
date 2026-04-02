import { locationQueries } from "./locations/queries";
import { locationMutations } from "./locations/mutations";

export const resolvers = {
  Query: {
    allLocations: locationQueries.allLocations,
    locationsById: locationQueries.locationsById,
    onUserWishlist: locationQueries.onUserWishlist,
  },
  Mutation: {
    addWishlist: locationMutations.addWishlist,
    removeWishlist: locationMutations.removeWishlist,
  },
};
