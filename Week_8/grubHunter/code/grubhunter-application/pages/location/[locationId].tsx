import Head from "next/head";
import { GetServerSideProps } from "next";

import dbConnect from "@/middleware/mongodb-connection";
import LocationDetails from "@/components/location-details";
import { LocationType } from "@/mongoose/locations/schema";
import { findLocationsById } from "@/mongoose/locations/services";

interface Props {
  data: {
    location: string;
  };
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const locationId = params?.locationId;

  if (typeof locationId !== "string") {
    return { notFound: true };
  }

  await dbConnect();
  const locations = await findLocationsById({ locationId });
  const location = locations[0];

  if (!location) {
    return { notFound: true };
  }

  return {
    props: {
      data: {
        location: JSON.stringify(location),
      },
    },
  };
};

const LocationPage = ({ data }: Props) => {
  const location: LocationType = JSON.parse(data.location);
  const pageTitle = location.name;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`Details for ${location.name}`} />
      </Head>
      <div>
        <h1>{location.name}</h1>
        <LocationDetails location={location} />
      </div>
    </>
  );
};

export default LocationPage;
