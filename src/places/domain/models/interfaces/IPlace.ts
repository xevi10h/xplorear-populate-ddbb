import { Types } from "mongoose";
import Address from "../valueObjects/Address";
import IPhoto from "./IPhoto";

export default interface IPlace {
  _id?: Types.ObjectId;
  name: string;
  address: Address;
  description: string;
  importance: number;
  photos?: IPhoto[];
  rating?: number;
}
