import { Types } from "mongoose";
import IPhoto from "./IPhoto";
import IAddress from "./IAddress";

export default interface IPlace {
  _id?: Types.ObjectId;
  name: string;
  address: IAddress;
  description: string;
  importance: number;
  photos?: IPhoto[];
  rating?: number;
}
