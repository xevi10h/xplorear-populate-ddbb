import Address from "./valueObjects/Address";
import IPlace from "./interfaces/IPlace";
import IPhoto from "./interfaces/IPhoto";

export default class Place implements IPlace {
  id?: string;
  name: string;
  address: Address;
  description: string;
  importance: number;
  photos?: IPhoto[];
  rating?: number;

  constructor(place: IPlace) {
    this.id = place.id;
    this.name = place.name;
    this.address = place.address;
    this.description = place.description;
    this.importance = place.importance;
    this.photos = place.photos;
    this.rating = place.rating;
  }
}
