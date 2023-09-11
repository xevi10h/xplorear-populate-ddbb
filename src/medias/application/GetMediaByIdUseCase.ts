import { MongoMediaModel } from "../infrastructure/mongoModel/MongoMediaModel";
import IMedia from "../domain/IMedia";

export default async function GetMediaByIdUseCase(
  id: string
): Promise<IMedia | null> {
  return await MongoMediaModel.findById(id);
}
