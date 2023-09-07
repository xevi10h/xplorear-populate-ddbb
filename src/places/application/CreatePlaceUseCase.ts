import IPlace from "../domain/interfaces/IPlace";
import { MongoPlaceModel } from "../infrastructure/mongoModel/MongoPlaceModel";

export async function CreatePlaceUseCase(place: IPlace): Promise<IPlace> {
  const newPlace = new MongoPlaceModel(place);
  return await newPlace.save();
}
