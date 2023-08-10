import { model, Schema, Types } from "mongoose";
import IRoute from "../../domain/models/interfaces/IRoute";

const routeSchema = new Schema<IRoute>({
  _id: Types.ObjectId,
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  rating: { type: Number },
  mediaIds: [{ type: Schema.Types.ObjectId, ref: "Media" }],
});

export const MongoRouteModel = model("routes", routeSchema);
