import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import styles from "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";
import Button from "@/components/button";

interface Props {
  location: LocationType;
}

interface WishlistInterface {
  locationId: string;
  userId: string;
}

type WishlistMutationName = "addWishlist" | "removeWishlist";

interface WishlistMutationResponse {
  data?: {
    addWishlist?: {
      on_wishlist?: string[];
    } | null;
    removeWishlist?: {
      on_wishlist?: string[];
    } | null;
  };
  errors?: unknown;
}

const LocationDetails = ({ location }: Props) => {
  const { data: session } = useSession();
  const [onWishlist, setOnWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = session?.user?.fdlst_private_userId;

    setOnWishlist(Boolean(userId && location.on_wishlist?.includes(userId)));
  }, [location.on_wishlist, session?.user?.fdlst_private_userId]);

  const wishlistAction = async ({ locationId, userId }: WishlistInterface) => {
    if (loading) {
      return;
    }

    setLoading(true);

    const mutationName: WishlistMutationName = onWishlist ? "removeWishlist" : "addWishlist";

    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation WishlistAction($location_id: String!, $user_id: String!) {
              ${mutationName}(location_id: $location_id, user_id: $user_id) {
                location_id
                on_wishlist
              }
            }
          `,
          variables: {
            location_id: locationId,
            user_id: userId,
          },
        }),
      });

      const result: WishlistMutationResponse = await response.json();
      const updatedLocation = result.data?.[mutationName];

      if (response.ok && !result.errors && updatedLocation) {
        setOnWishlist(Boolean(updatedLocation.on_wishlist?.includes(userId)));
      }
    } finally {
      setLoading(false);
    }
  };

  if (!location) {
    return null;
  }

  const userId = session?.user?.fdlst_private_userId;

  return (
    <ul className={styles.root}>
      <li>Address: {location.address}</li>
      <li>Zipcode: {location.zipcode}</li>
      <li>Borough: {location.borough}</li>
      <li>Cuisine: {location.cuisine}</li>
      <li>Grade: {location.grade}</li>
      {userId ? (
        <li className={styles.actionRow}>
          <Button
            disabled={loading}
            variant={onWishlist ? "outline" : "blue"}
            clickHandler={() => wishlistAction({ locationId: location.location_id, userId })}
          >
            {onWishlist ? "Remove from your Wishlist" : "Add to your Wishlist"}
          </Button>
        </li>
      ) : null}
    </ul>
  );
};

export default LocationDetails;
