import mongoose from "mongoose";
import IMedia from "./interfaces/IMedia";

export default class Media implements IMedia {
  id?: string;
  placeId?: mongoose.Types.ObjectId;
  title: string;
  text: string;
  lang: string;
  rating: number;
  audioUrl: string;
  voiceId: string;

  constructor(media: IMedia) {
    this.id = media.id;
    this.placeId = media.placeId;
    this.title = media.title;
    this.text = media.text;
    this.lang = media.lang;
    this.rating = media.rating;
    this.audioUrl = media.audioUrl;
    this.voiceId = media.voiceId;
  }
}
