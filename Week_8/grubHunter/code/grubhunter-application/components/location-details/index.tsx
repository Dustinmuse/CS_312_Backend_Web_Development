import styles from "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";

interface Props {
  location: LocationType;
}

const LocationDetails = ({ location }: Props) => {
  if (!location) {
    return null;
  }

  return (
    <ul className={styles.root}>
      <li>Address: {location.address}</li>
      <li>Zipcode: {location.zipcode}</li>
      <li>Borough: {location.borough}</li>
      <li>Cuisine: {location.cuisine}</li>
      <li>Grade: {location.grade}</li>
    </ul>
  );
};

export default LocationDetails;
