import { MongoPlaceModel } from "../../places/infrastructure/mongoModel/MongoPlaceModel";
import { MongoMediaModel } from "../../media/infrastructure/mongoModel/MongoMediaModel";
import { MongoRouteModel } from "../infrastructure/mongoModel/MongoRouteModel";

interface GetRouteByIdDTO {
  id: string;
}

export default async function GetRouteByIdUseCase({ id }: GetRouteByIdDTO) {
  const route = await MongoRouteModel.findById(id);
  const medias = await MongoMediaModel.find({
    _id: { $in: route?.mediaIds },
  });
  const uniquePlaceIds = new Set(medias.map((media) => media.placeId));
  const places = await MongoPlaceModel.find({
    _id: { $in: [...uniquePlaceIds] },
  });
  return route;
}
