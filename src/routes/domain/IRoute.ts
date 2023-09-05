import { Types } from "mongoose";
import IStop from "./IStop";

export default interface IRoute {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  rating?: number;
  duration: number;
  optimizedDuration: number;
  distance: number;
  optimizedDistance: number;
  stops: IStop[];
}
