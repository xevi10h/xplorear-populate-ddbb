import Address from "../../domain/models/valueObjects/Address";
import Name from "../../domain/models/valueObjects/Name";

export default interface PopulatePlacesDto {
  place: string; // Normally will be the city
  placeExtra?: string; // Normally will be a specific zone or neighborhood
  number?: number;
}
