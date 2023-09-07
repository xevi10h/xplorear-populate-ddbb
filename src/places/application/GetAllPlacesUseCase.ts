import { MongoPlaceModel } from "../infrastructure/mongoModel/MongoPlaceModel";
import IPlace from "../domain/interfaces/IPlace";

export async function GetAllPlacesUseCase(): Promise<IPlace[]> {
  return await MongoPlaceModel.find();
}
