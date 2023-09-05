import PopulateMediaByNumberUseCase from "../../application/PopulateMediaByNumberUseCase";
import PopulateMediaByTopicUseCase from "../../application/PopulateMediaByTopicUseCase";
import TranslateMediaUseCase from "../../application/TranslateMediaUseCase";
import IMedia from "../../domain/IMedia";
import { MongoMediaModel } from "../mongoModel/MongoMediaModel";

const resolvers = {
  Mutation: {
    populateMediaByNumber: async (
      parent: any,
      args: { placeId: string; number?: number; lang?: any }
    ) =>
      PopulateMediaByNumberUseCase({
        placeId: args.placeId,
        number: args.number,
        lang: args.lang?.replace("_", "-"),
      }),
    populateMediaByTopic: async (
      parent: any,
      args: {
        placeId: string;
        topic?: string;
        lang?: any;
      }
    ) =>
      PopulateMediaByTopicUseCase({
        placeId: args.placeId,
        topic: args.topic,
        lang: args.lang?.replace("_", "-"),
      }),

    translateMedia: async (
      parent: any,
      args: { mediaId: string; outputLang: any }
    ) =>
      TranslateMediaUseCase({
        mediaId: args.mediaId,
        outputLang: args.outputLang?.replace("_", "-"),
      }),
  },
  Query: {
    media: async (parent: any, args: { id: string }) =>
      MongoMediaModel.findById(args.id),
    mediaOfPlace: async (
      parent: any,
      args: { placeId: string; lang: string }
    ) => {
      const query = args.lang
        ? { "place._id": args.placeId, lang: args.lang }
        : { "place._id": args.placeId };
      return MongoMediaModel.find(query);
    },
  },
  Media: {
    // Resolver para el campo imagesUrl
    duration: (parent: IMedia) => 1,
  },
};

export default resolvers;
