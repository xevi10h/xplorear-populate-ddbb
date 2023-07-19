import Place from "../domain/models/Place";
import PlaceRepository from "../domain/repositories/PlaceRepository";
import CreatePlaceDto from "./createPlace/CreatePlaceDTO";

class CreatePlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<void> {
    const place = new Place(createPlaceDto);
    await this.placeRepository.create(place);
  }
}

export default CreatePlaceService;
