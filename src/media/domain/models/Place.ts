import Address from "./valueObjects/Address";
import Name from "./valueObjects/Name";
import IPlace from "./interfaces/IPlace";

export default class Place implements IPlace {
  id: string;
  name: string;
  address: Address;
  rating: number;
  types: string[];
  description: string;

  constructor(place: IPlace) {
    this.id = place.id;
    this.name = place.name;
    this.address = place.address;
    this.rating = place.rating;
    this.types = place.types;
    this.description = place.description;
  }
}
