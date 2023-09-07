import IPlace from "../domain/interfaces/IPlace";
import { MongoPlaceModel } from "../infrastructure/mongoModel/MongoPlaceModel";
import { MongoMediaModel } from "../../medias/infrastructure/mongoModel/MongoMediaModel";

export default async function UpdatePlaceAndAssociatedMedia(
  placeId: string,
  placeUpdate: Partial<IPlace>
): Promise<void> {
  console.log(placeId);
  const placeUpdated = await MongoPlaceModel.findByIdAndUpdate(
    placeId,
    placeUpdate,
    { new: true }
  );
  await MongoMediaModel.updateMany(
    { "place._id": placeId },
    { $set: { place: placeUpdated } }
  );
}
