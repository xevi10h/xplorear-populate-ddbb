import mongoose, { Types } from "mongoose";

export default interface IMedia {
  _id?: Types.ObjectId;
  placeId: mongoose.Types.ObjectId;
  title: string;
  text: string;
  lang: string;
  rating: number;
  audioUrl: string;
  voiceId: string;
  duration?: number;
}
