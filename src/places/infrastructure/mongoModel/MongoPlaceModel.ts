import { model, Schema, Types } from "mongoose";
import IPlace from "../../domain/models/interfaces/IPlace";

const Photo = {
  id: String,
  url: String,
  width: Number,
  height: Number,
};

const placeSchema = new Schema<IPlace>({
  _id: Types.ObjectId,
  name: { type: String, required: true, unique: true },
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
  photos: { type: [Photo] },
  rating: { type: Number },
});

export const MongoPlaceModel = model("places", placeSchema);
