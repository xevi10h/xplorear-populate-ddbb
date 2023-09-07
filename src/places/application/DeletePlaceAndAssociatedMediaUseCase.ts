import { MongoPlaceModel } from "../infrastructure/mongoModel/MongoPlaceModel";
import IPlace from "../domain/interfaces/IPlace";
import { MongoMediaModel } from "../../medias/infrastructure/mongoModel/MongoMediaModel";
import { ApolloError } from "apollo-server-errors";

export default async function DeletePlaceAndAssociatedMediaUseCase(
  placeId: string
): Promise<IPlace | null> {
  try {
    await MongoMediaModel.deleteMany({ "place._id": placeId });
    return await MongoPlaceModel.findByIdAndRemove(placeId);
  } catch (error) {
    console.error("Error while deleting Place y associated Media", error);
    throw new ApolloError(
      "Error while deleting Place y associated Media",
      "DELETE_PLACE_AND_ASSOCIATED_MEDIA"
    );
  }
}
