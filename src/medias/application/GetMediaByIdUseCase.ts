import { MongoMediaModel } from "../infrastructure/mongoModel/MongoMediaModel.js";
import IMedia from "../domain/IMedia.js";

export default async function GetMediaByIdUseCase(
  id: string
): Promise<IMedia | null> {
  return await MongoMediaModel.findById(id);
}
