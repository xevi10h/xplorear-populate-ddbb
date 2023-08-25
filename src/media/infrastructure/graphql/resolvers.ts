import Media from "../../domain/models/Media";
import { MongoMediaModel } from "../mongoModel/MongoMediaModel";

const resolvers = {
  Query: {
    media: async (parent: any, args: { id: string }) => {
      return MongoMediaModel.findById(args.id);
    },
    mediaOfPlace: async (
      parent: any,
      args: { placeId: string; lang: string }
    ) => {
      const query = args.lang
        ? { placeId: args.placeId, lang: args.lang }
        : { placeId: args.placeId };
      return MongoMediaModel.find(query);
    },
  },
  Media: {
    // Resolver para el campo imagesUrl
    duration: (parent: Media) => 1,
  },
};

export default resolvers;
