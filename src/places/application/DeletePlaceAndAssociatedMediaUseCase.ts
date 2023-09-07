import { Types } from "mongoose";
import { MongoPlaceModel } from "../infrastructure/mongoModel/MongoPlaceModel";
import IPlace from "../domain/interfaces/IPlace";
import { MongoMediaModel } from "../../medias/infrastructure/mongoModel/MongoMediaModel";

export async function DeletePlaceAndAssociatedMediaUseCase(
  placeId: Types.ObjectId
): Promise<IPlace | null> {
  try {
    await MongoMediaModel.deleteMany({ "place._id": placeId });
    return await MongoPlaceModel.findByIdAndRemove(placeId);
  } catch (error) {
    console.error("Error eliminando Place y Media asociado:", error);
    throw error;
  }
}
