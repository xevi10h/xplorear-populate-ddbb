import { MongoMediaModel } from "../infrastructure/mongoModel/MongoMediaModel";
import IMedia from "../domain/IMedia";

export default async function GetMediasByPlaceIdUseCase(
  placeId: string,
  lang: string
): Promise<IMedia[]> {
  const query = {};
  if (placeId) {
    Object.assign(query, { "place._id": placeId });
  }
  if (lang) {
    Object.assign(query, { lang });
  }
  return MongoMediaModel.find(query);
}
