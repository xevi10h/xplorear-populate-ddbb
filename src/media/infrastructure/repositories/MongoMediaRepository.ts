import Media from "../../domain/models/Media";
import MediaRepository from "../../domain/repositories/MediaRepository";
import mongoose, { Model } from "mongoose";
import IMedia from "../../domain/models/interfaces/IMedia";

export default class MongoMediaRepository implements MediaRepository {
  constructor(private readonly MediaModel: Model<IMedia>) {}

  async create(media: Media): Promise<void> {
    await this.MediaModel.create({
      _id: media.id,
      ...media,
      placeId: new mongoose.Types.ObjectId(media.placeId),
    });
  }

  async save(media: Media): Promise<void> {
    await this.MediaModel.updateOne({ _id: media.id }, media);
  }

  async delete(_id: string): Promise<void> {
    await this.MediaModel.deleteOne({ _id });
  }

  async get(filter: any): Promise<Media[]> {
    return this.MediaModel.find(filter).exec();
  }

  async getById(_id: string): Promise<Media | null | undefined> {
    return this.MediaModel.findById(_id).exec();
  }

  async getByPlaceId(placeId: string, lang?: string): Promise<Media[]> {
    const query = lang ? { placeId, lang } : { placeId };
    return this.MediaModel.find(query).exec();
  }

  async getAll(): Promise<Media[]> {
    return this.MediaModel.find().exec();
  }
}
