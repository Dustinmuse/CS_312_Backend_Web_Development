import mongoose, { Model } from "mongoose";
import { LocationSchema, LocationType } from "./schema";

export const LocationModel: Model<LocationType> =
  mongoose.models.Location || mongoose.model<LocationType>("Location", LocationSchema);
