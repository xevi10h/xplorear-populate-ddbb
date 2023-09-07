import { Types } from "mongoose";
import { MongoPlaceModel } from "../infrastructure/mongoModel/MongoPlaceModel";
import IPlace from "../domain/interfaces/IPlace";

export async function GetPlaceByIdUseCase(
  placeId: Types.ObjectId
): Promise<IPlace | null> {
  return await MongoPlaceModel.findById(placeId);
}
