import { model, Schema, Types } from "mongoose";
import IRoute from "../../domain/IRoute";
import { MediaSchema } from "../../../medias/infrastructure/mongoModel/MongoMediaModel";
import IStop from "../../domain/IStop";

const StopSchema = new Schema<IStop>({
  order: { type: Number, required: true },
  optimizedOrder: { type: Number, required: true },
  media: { type: MediaSchema },
});

const RouteSchema = new Schema<IRoute>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  rating: { type: Number },
  stops: [{ type: StopSchema, required: true }],
  duration: { type: Number, required: true },
  optimizedDuration: { type: Number, required: true },
  distance: { type: Number, required: true },
  optimizedDistance: { type: Number, required: true },
});

export const MongoRouteModel = model("routes", RouteSchema);