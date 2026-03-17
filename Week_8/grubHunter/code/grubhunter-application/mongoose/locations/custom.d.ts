export type FindLocationByIdParams = {
  locationId: string;
};

export type FindWishlistLocationsParams = {
  userId: string;
};

export type UpdateWishlistParams = {
  locationId: string;
  userId: string;
  action: "add" | "remove";
};
