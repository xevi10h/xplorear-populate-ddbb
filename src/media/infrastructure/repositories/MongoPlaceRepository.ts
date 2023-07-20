import Place from "../../domain/models/Place";
import PlaceRepository from "../../domain/repositories/PlaceRepository";
import { Model } from "mongoose";
import IPlace from "../../domain/models/interfaces/IPlace";

export default class MongoPlaceRepository implements PlaceRepository {
  constructor(private readonly PlaceModel: Model<IPlace>) {}

  async create(place: Place): Promise<void> {
    await this.PlaceModel.create({ _id: place.id, ...place });
  }

  async save(place: Place): Promise<void> {
    await this.PlaceModel.updateOne({ _id: place.id }, place);
  }

  async delete(_id: string): Promise<void> {
    await this.PlaceModel.deleteOne({ _id });
  }

  async getById(_id: string): Promise<Place | null | undefined> {
    return this.PlaceModel.findById(_id).exec();
  }

  async getAll(): Promise<Place[]> {
    return this.PlaceModel.find().exec();
  }
}
