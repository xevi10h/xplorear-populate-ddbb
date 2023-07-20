import Place from "../../domain/models/Place";
import PlaceRepository from "../../domain/repositories/PlaceRepository";

class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async getPlaceById(placeId: string): Promise<Place | null | undefined> {
    return this.placeRepository.getById(placeId);
  }
}

export default PlaceService;
