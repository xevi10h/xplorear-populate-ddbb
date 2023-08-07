import MongoMediaRepository from "../repositories/MongoMediaRepository";
import Media from "../../domain/models/Media";
import { MongoMediaModel } from "../mongoModel/MongoMediaModel";
const mongoMediaRepository = new MongoMediaRepository(MongoMediaModel);

const resolvers = {
  Query: {
    media: async (parent: any, args: { id: string }) => {
      return mongoMediaRepository.getById(args.id);
    },
    mediaOfPlace: async (
      parent: any,
      args: { placeId: string; lang: string }
    ) => {
      console.log(args.lang);
      return mongoMediaRepository.getByPlaceId(
        args.placeId,
        args.lang?.replace("_", "-")
      );
    },
  },
  Media: {
    // Resolver para el campo imagesUrl
    duration: (parent: Media) => 1,
  },
};

export default resolvers;
