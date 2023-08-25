import { Model } from "mongoose";
import Media from "../domain/models/Media";
import IMedia from "../domain/models/interfaces/IMedia";

class MediaService {
  constructor(private readonly MediaModel: Model<IMedia>) {}

  async createOne(media: Media): Promise<Media> {
    return this.MediaModel.create(media);
  }
  async getMediaById(mediaId: string): Promise<Media | null | undefined> {
    return this.MediaModel.findById(mediaId);
  }

  async getMediaByPlaceId(placeId: string, lang?: string): Promise<Media[]> {
    const query = lang ? { placeId, lang } : { placeId };
    return this.MediaModel.find(query);
  }
}

export default MediaService;
