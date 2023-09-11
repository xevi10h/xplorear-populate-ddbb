import { MongoMediaModel } from "../infrastructure/mongoModel/MongoMediaModel";
import IMedia from "../domain/IMedia";

export default async function GetMediasByPlaceIdUseCase(
  placeId: string,
  lang: string
): Promise<IMedia[]> {
  const query = lang
    ? { "place._id": placeId, lang: lang }
    : { "place._id": placeId };
  return MongoMediaModel.find(query);
}
