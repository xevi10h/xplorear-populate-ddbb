import { MongoMediaModel } from "../infrastructure/mongoModel/MongoMediaModel.js";
import IMedia from "../domain/IMedia.js";

export default async function GetMediasByPlaceIdUseCase(
  placeId: string,
  lang: string
): Promise<IMedia[]> {
  const query = {};
  if (placeId) {
    Object.assign(query, { "place._id": placeId });
  }
  if (lang) {
    Object.assign(query, { lang: lang.replace("_", "-") });
  }
  return MongoMediaModel.find(query);
}
