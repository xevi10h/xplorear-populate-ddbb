import { model, Model, Schema } from "mongoose";
import IPlace from "../../domain/models/interfaces/IPlace";

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
  rating: { type: Number },
  types: { type: [String] },
  description: { type: String },
});

export const MongoPlaceModel = model("places", placeSchema);
