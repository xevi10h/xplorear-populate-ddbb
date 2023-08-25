import { Model } from "mongoose";
import Place from "../domain/models/Place";
import IPlace from "../domain/models/interfaces/IPlace";

class PlaceService {
  constructor(private readonly PlaceModel: Model<IPlace>) {}

  async createOne(place: Place): Promise<Place> {
    return this.PlaceModel.create(place);
  }

  async getPlaceById(placeId: string): Promise<Place | null | undefined> {
    return this.PlaceModel.findById(placeId);
  }

  async getPlaceByName(name: string): Promise<Place | null | undefined> {
    return this.PlaceModel.findOne({ name });
  }
}

export default PlaceService;
