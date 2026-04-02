import styles from "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";
import LocationsListItem from "@/components/locations-list-item";

interface Props {
  locations: LocationType[];
}

const LocationsList = ({ locations }: Props) => {
  return (
    <ul className={styles.root}>
      {locations.map((location) => (
        <LocationsListItem key={location.location_id} location={location} />
      ))}
    </ul>
  );
};

export default LocationsList;
