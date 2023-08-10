import Place from "../../domain/models/Place";
import PlaceRepository from "../../domain/repositories/PlaceRepository";
import { Model } from "mongoose";
import IPlace from "../../domain/models/interfaces/IPlace";

export default class MongoPlaceRepository implements PlaceRepository {
  constructor(private readonly PlaceModel: Model<IPlace>) {}

  async create(place: Place): Promise<Place> {
    return this.PlaceModel.create(place);
  }

  async save(place: Place): Promise<void> {
    await this.PlaceModel.updateOne({ _id: place._id }, place);
  }

  async delete(_id: string): Promise<void> {
    await this.PlaceModel.deleteOne({ _id });
  }

  async getById(_id: string): Promise<Place | null | undefined> {
    return this.PlaceModel.findById(_id).exec();
  }

  async getByName(name: string): Promise<Place | null | undefined> {
    return this.PlaceModel.findOne({ name }).exec();
  }

  async getAll(): Promise<Place[]> {
    return this.PlaceModel.find().exec();
  }

  async updateById(
    _id: string,
    update: Partial<Place>
  ): Promise<Place | null | undefined> {
    return this.PlaceModel.findByIdAndUpdate(_id, update);
  }
}
