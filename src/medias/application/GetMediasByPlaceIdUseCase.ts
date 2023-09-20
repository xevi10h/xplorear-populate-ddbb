import { MongoMediaModel } from "../infrastructure/mongoModel/MongoMediaModel.js";
import IMedia from "../domain/IMedia.js";

export default async function GetMediasByPlaceIdUseCase(
  placeId: string,
  language: string
): Promise<IMedia[]> {
  const query = {};
  if (placeId) {
    Object.assign(query, { "place._id": placeId });
  }
  if (language) {
    Object.assign(query, { language: language.replace("_", "-") });
  }
  return MongoMediaModel.find(query);
}
