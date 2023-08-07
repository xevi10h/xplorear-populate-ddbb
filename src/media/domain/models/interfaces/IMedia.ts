import mongoose from "mongoose";

export default interface IMedia {
  id?: string;
  placeId?: mongoose.Types.ObjectId;
  title: string;
  text: string;
  lang: string;
  rating: number;
  audioUrl: string;
  voiceId: string;
  duration?: number;
}
