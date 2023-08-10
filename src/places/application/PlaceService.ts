import Place from "../domain/models/Place";
import PlaceRepository from "../domain/repositories/PlaceRepository";

class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async createOne(place: Place): Promise<Place> {
    return this.placeRepository.create(place);
  }

  async getPlaceById(id: string): Promise<Place | null | undefined> {
    return this.placeRepository.getById(id);
  }

  async getPlaceByName(name: string): Promise<Place | null | undefined> {
    return this.placeRepository.getByName(name);
  }
}

export default PlaceService;
