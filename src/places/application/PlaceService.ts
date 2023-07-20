import Place from "../domain/models/Place";
import PlaceRepository from "../domain/repositories/PlaceRepository";

class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async createOne(place: Place): Promise<void> {
    await this.placeRepository.create(place);
  }
}

export default PlaceService;
