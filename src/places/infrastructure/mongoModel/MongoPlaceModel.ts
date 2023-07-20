import { model, Schema } from "mongoose";
import IPlace from "../../domain/models/interfaces/IPlace";
import { v4 } from "uuid";

const placeSchema = new Schema<IPlace>({
  name: { type: String, required: true },
  address: {
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    street: { type: String },
    city: { type: String, required: true },
    postalCode: { type: String },
    province: { type: String },
    country: { type: String, required: true },
  },
  description: { type: String, required: true },
  importance: { type: Number, required: true },
  rating: { type: Number },
  types: { type: [String] },
});

export const MongoPlaceModel = model("places", placeSchema);
