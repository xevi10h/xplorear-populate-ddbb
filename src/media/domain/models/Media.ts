import mongoose, { Types } from "mongoose";
import IMedia from "./interfaces/IMedia";

export default class Media implements IMedia {
  _id: Types.ObjectId;
  placeId: mongoose.Types.ObjectId;
  title: string;
  text: string;
  lang: string;
  rating: number;
  audioUrl: string;
  voiceId: string;
  duration?: number;

  constructor(media: IMedia) {
    this._id = new Types.ObjectId();
    this.placeId = media.placeId;
    this.title = media.title;
    this.text = media.text;
    this.lang = media.lang;
    this.rating = media.rating;
    this.audioUrl = media.audioUrl;
    this.voiceId = media.voiceId;
    this.duration = media.duration;
  }
}
