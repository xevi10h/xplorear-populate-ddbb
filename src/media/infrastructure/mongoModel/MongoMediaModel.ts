import { model, Schema } from "mongoose";
import IMedia from "../../domain/models/interfaces/IMedia";

const mediaSchema = new Schema<IMedia>({
  placeId: { type: Schema.Types.ObjectId, ref: "places", required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  lang: { type: String, required: true },
  rating: { type: Number, required: true },
  audioUrl: { type: String, required: true },
  voiceId: { type: String, required: true },
});

export const MongoMediaModel = model("media", mediaSchema);
