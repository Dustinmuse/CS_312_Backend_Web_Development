import Head from "next/head";
import { GetStaticProps } from "next";

import dbConnect from "@/middleware/mongodb-connection";
import { LocationType } from "@/mongoose/locations/schema";
import { findAllLocations } from "@/mongoose/locations/services";
import LocationsList from "@/components/locations-list";

interface Props {
  data: {
    locations: string;
  };
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  await dbConnect();
  const locations = await findAllLocations();

  return {
    props: {
      data: {
        locations: JSON.stringify(locations),
      },
    },
  };
};

const StartPage = ({ data }: Props) => {
  const locations: LocationType[] = JSON.parse(data.locations);
  const pageTitle = "All Locations";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Browse all restaurant locations" />
      </Head>
      <div>
        <h1>{pageTitle}</h1>
        <LocationsList locations={locations} />
      </div>
    </>
  );
};

export default StartPage;
