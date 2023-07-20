import Address from "./valueObjects/Address";
import IPlace from "./interfaces/IPlace";

export default class Place implements IPlace {
  id?: string;
  name: string;
  address: Address;
  description: string;
  importance: number;
  rating?: number;
  types?: string[];

  constructor(place: IPlace) {
    this.id = place.id;
    this.name = place.name;
    this.address = place.address;
    this.description = place.description;
    this.importance = place.importance;
    this.rating = place.rating;
    this.types = place.types;
  }
}
