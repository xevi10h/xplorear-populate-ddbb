import Address from "./valueObjects/Address";
import IPlace from "./interfaces/IPlace";
import IPhoto from "./interfaces/IPhoto";
import { Types } from "mongoose";

export default class Place implements IPlace {
  _id: Types.ObjectId;
  name: string;
  address: Address;
  description: string;
  importance: number;
  photos?: IPhoto[];
  rating?: number;

  constructor(place: IPlace) {
    this._id = new Types.ObjectId();
    this.name = place.name;
    this.address = place.address;
    this.description = place.description;
    this.importance = place.importance;
    this.photos = place.photos;
    this.rating = place.rating;
  }
}
