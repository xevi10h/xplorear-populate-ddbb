import DeleteMediaAndUpdatedAssociatedRoutesUseCase from "../../application/DeleteMediaAndUpdatedAssociatedRoutesUseCase";
import GetAllMediasUseCase from "../../application/GetAllMediasUseCase";
import GetMediaByIdUseCase from "../../application/GetMediaByIdUseCase";
import GetMediasByPlaceIdUseCase from "../../application/GetMediasByPlaceIdUseCase";
import PopulateMediaByNumberUseCase from "../../application/PopulateMediaByNumberUseCase";
import PopulateMediaByTopicUseCase from "../../application/PopulateMediaByTopicUseCase";
import TranslateMediaUseCase from "../../application/TranslateMediaUseCase";
import UpdateMediaAndAssociatedRoutesUseCase from "../../application/UpdateMediaAndAssociatedRoutesUseCase";
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
      args: { id: string; outputLang: any }
    ) =>
      TranslateMediaUseCase({
        id: args.id,
        outputLang: args.outputLang?.replace("_", "-"),
      }),
    updateMedia: (
      parent: any,
      args: { id: string; mediaUpdate: Partial<IMedia> }
    ) => UpdateMediaAndAssociatedRoutesUseCase(args.id, args.mediaUpdate),
    deleteMedia: (parent: any, args: { id: string }) =>
      DeleteMediaAndUpdatedAssociatedRoutesUseCase(args.id),
  },
  Query: {
    getMediaById: (parent: any, { id }: { id: string }) =>
      GetMediaByIdUseCase(id),
    getAllMedias: () => GetAllMediasUseCase(),
    getMediaOfPlace: async (
      parent: any,
      args: { placeId: string; lang: string }
    ) => GetMediasByPlaceIdUseCase(args.placeId, args.lang),
  },
};

export default resolvers;
