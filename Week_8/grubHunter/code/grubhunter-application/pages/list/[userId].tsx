import Head from "next/head";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

import dbConnect from "@/middleware/mongodb-connection";
import { findWishlistLocations } from "@/mongoose/locations/services";
import { LocationType } from "@/mongoose/locations/schema";
import LocationsList from "@/components/locations-list";

interface Props {
  locations: string;
  userId: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const userId = query?.userId;

  if (typeof userId !== "string") {
    return {
      props: {
        locations: JSON.stringify([]),
        userId: "",
      },
    };
  }

  try {
    await dbConnect();
    const locations = await findWishlistLocations({ userId });

    return {
      props: {
        locations: JSON.stringify(locations),
        userId,
      },
    };
  } catch {
    return {
      props: {
        locations: JSON.stringify([]),
        userId,
      },
    };
  }
};

const ListPage = ({ locations, userId }: Props) => {
  const { data: session } = useSession();
  const parsedLocations: LocationType[] = JSON.parse(locations);
  const currentUserId = session?.user?.fdlst_private_userId;
  const isCurrentUsersList = Boolean(currentUserId && currentUserId === userId);
  const pageTitle = isCurrentUsersList ? "Your Wish List" : "Wish List";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Browse saved wish list locations" />
      </Head>
      <div>
        <h1>{pageTitle}</h1>
        {isCurrentUsersList && parsedLocations.length === 0 ? (
          <p>You have no saved locations yet.</p>
        ) : (
          <LocationsList locations={parsedLocations} />
        )}
      </div>
    </>
  );
};

export default ListPage;
