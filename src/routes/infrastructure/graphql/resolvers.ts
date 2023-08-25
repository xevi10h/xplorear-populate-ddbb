import { MongoRouteModel } from "../mongoModel/MongoRouteModel";
import { MongoMediaModel } from "../../../media/infrastructure/mongoModel/MongoMediaModel";
import { MongoPlaceModel } from "../../../places/infrastructure/mongoModel/MongoPlaceModel";

const resolvers = {
  Query: {
    route: async (parent: any, args: { id: string }) => {
      const route = await MongoRouteModel.findById(args.id);
      const medias = await MongoMediaModel.find({
        _id: { $in: route?.mediaIds },
      });
      const uniquePlaceIds = new Set(medias.map((media) => media.placeId));
      const places = await MongoPlaceModel.find({
        _id: { $in: [...uniquePlaceIds] },
      });
      console.log(places);

      return route;
    },
  },
};

export default resolvers;
