import Place from "../../../domain/models/Place";
import PlaceService from "../PlaceService";

class GetPlaceByIdUseCase {
  constructor(private readonly placeService: PlaceService) {}

  async execute(placeId: string): Promise<Place | null | undefined> {
    return this.placeService.getPlaceById(placeId);
  }
}

export default GetPlaceByIdUseCase;
