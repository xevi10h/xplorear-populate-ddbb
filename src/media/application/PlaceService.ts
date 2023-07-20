import Place from "../domain/models/Place";
import PlaceRepository from "../domain/repositories/PlaceRepository";
import PopulatePlacesDTO from "./populatePlaces/PopulatePlacesDTO";

class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async createPlace(place: Place): Promise<void> {
    await this.placeRepository.create(place);
  }
}

export default PlaceService;
