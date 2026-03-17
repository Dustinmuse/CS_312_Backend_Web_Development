import dbConnect from "@/middleware/mongodb-connection";
import { LocationModel } from "@/mongoose/locations/model";
import {
  FindLocationByIdParams,
  FindWishlistLocationsParams,
  UpdateWishlistParams,
} from "@/mongoose/locations/custom";

type LocationQueryFilter = Record<string, unknown>;

async function findLocations(filter: LocationQueryFilter) {
  await dbConnect();
  return LocationModel.find(filter).lean().exec();
}

export async function findAllLocations() {
  return findLocations({});
}

export async function findLocationsById({ locationId }: FindLocationByIdParams) {
  return findLocations({ location_id: locationId });
}

export async function findWishlistLocations({ userId }: FindWishlistLocationsParams) {
  return findLocations({ on_wishlist: userId });
}

export async function updateWishlistForUser({ locationId, userId, action }: UpdateWishlistParams) {
  await dbConnect();

  const update =
    action === "add" ? { $addToSet: { on_wishlist: userId } } : { $pull: { on_wishlist: userId } };

  return LocationModel.findOneAndUpdate({ location_id: locationId }, update, {
    new: true,
  })
    .lean()
    .exec();
}
