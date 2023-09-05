import { model, Schema, Types } from "mongoose";
import IMedia from "../../domain/IMedia";
import { PlaceSchema } from "../../../places/infrastructure/mongoModel/MongoPlaceModel";

export const MediaSchema = new Schema<IMedia>({
  place: { type: PlaceSchema, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  lang: { type: String, required: true },
  rating: { type: Number, required: true },
  audioUrl: { type: String, required: true },
  voiceId: { type: String, required: true },
});

export const MongoMediaModel = model("medias", MediaSchema);