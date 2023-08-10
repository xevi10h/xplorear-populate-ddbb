import { Types } from "mongoose";
import IRoute from "./interfaces/IRoute";

export default class Route implements IRoute {
  _id: Types.ObjectId;
  title: string;
  description: string;
  rating?: number;
  mediaIds: Types.ObjectId[];

  constructor(route: IRoute) {
    this._id = new Types.ObjectId();
    this.title = route.title;
    this.description = route.description;
    this.rating = route.rating;
    this.mediaIds = route.mediaIds;
  }
}
