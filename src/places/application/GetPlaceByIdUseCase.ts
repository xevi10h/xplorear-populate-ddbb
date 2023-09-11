import { MongoPlaceModel } from "../infrastructure/mongoModel/MongoPlaceModel";
import IPlace from "../domain/interfaces/IPlace";

export default async function GetPlaceByIdUseCase(
  placeId: string
): Promise<IPlace | null> {
  return await MongoPlaceModel.findById(placeId);
}
