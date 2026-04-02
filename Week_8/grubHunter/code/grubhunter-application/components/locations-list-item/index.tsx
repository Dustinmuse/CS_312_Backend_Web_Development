import Link from "next/link";

import styles from "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";

interface Props {
  location: LocationType;
}

const LocationsListItem = ({ location }: Props) => {
  return (
    <li className={styles.root}>
      <Link href={`/location/${location.location_id}`}>
        <h2>{location.name}</h2>
        <small>{location.cuisine}</small>
        <small>{location.borough}</small>
      </Link>
    </li>
  );
};

export default LocationsListItem;
