import { Types } from "mongoose";
import IPlace from "../domain/interfaces/IPlace";
import IMedia from "../../medias/domain/IMedia";
import { MongoPlaceModel } from "../infrastructure/mongoModel/MongoPlaceModel";
import { MongoMediaModel } from "../../medias/infrastructure/mongoModel/MongoMediaModel";

interface UpdatePlaceAndAssociatedMediaDTO {
  placeId: Types.ObjectId;
  placeUpdates: Partial<IPlace>;
  mediaUpdates: Partial<IMedia>;
}

export default async function UpdatePlaceAndAssociatedMedia({
  placeId,
  placeUpdates,
}: UpdatePlaceAndAssociatedMediaDTO): Promise<void> {
  await MongoPlaceModel.findByIdAndUpdate(placeId, placeUpdates);
  await MongoMediaModel.updateMany(
    { "place._id": placeId },
    { $set: { place: placeUpdates } }
  );
}
