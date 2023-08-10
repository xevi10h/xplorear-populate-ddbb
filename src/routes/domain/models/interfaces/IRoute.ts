import { Types } from "mongoose";

export default interface IRoute {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  rating?: number;
  mediaIds: Types.ObjectId[];
}
