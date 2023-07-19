import CreatePlaceDTO from "./CreatePlaceDTO";
import PlaceService from "../PlaceService";
import Name from "../../domain/models/valueObjects/Name";

class CreatePlaceUseCase {
  constructor(private readonly placeService: PlaceService) {}

  async execute(createPlaceDTO: CreatePlaceDTO): Promise<void> {
    const placeExample = {
      id: "605ba3b7c616740d2055364d",
      name: "Sagrada Família",
      value: 5,
      address: {
        coordinates: {
          lat: 41.24,
          lng: 2.1,
        },
        street: "Calle de Mallorca, 401",
        city: "Barcelona",
        postalCode: "08013",
        country: "spain",
        province: "Barcelona",
      },
      types: ["culture"],
    };
    console.log(1111);
    await this.placeService.createPlace(placeExample);
  }
}

export default CreatePlaceUseCase;
