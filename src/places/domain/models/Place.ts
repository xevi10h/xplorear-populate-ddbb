import Address from "./valueObjects/Address";
import Name from "./valueObjects/Name";
import IPlace from "./interfaces/IPlace";

export default class Place implements IPlace {
  id: string;
  name: string;
  address: Address;
  value: number;
  types: string[];

  constructor(place: IPlace) {
    this.id = place.id;
    this.name = place.name;
    this.address = place.address;
    this.value = place.value;
    this.types = place.types;
  }
}
