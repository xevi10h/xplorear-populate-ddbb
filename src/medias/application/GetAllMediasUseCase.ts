import { MongoMediaModel } from "../infrastructure/mongoModel/MongoMediaModel";
import IMedia from "../domain/IMedia";

export default async function GetAllMediasUseCase(): Promise<IMedia[]> {
  return await MongoMediaModel.find();
}
