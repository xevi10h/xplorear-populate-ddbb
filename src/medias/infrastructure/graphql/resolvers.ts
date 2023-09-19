import DeleteMediaAndUpdatedAssociatedRoutesUseCase from "../../application/DeleteMediaAndUpdatedAssociatedRoutesUseCase.js";
import GetMediaByIdUseCase from "../../application/GetMediaByIdUseCase.js";
import GetMediasByPlaceIdUseCase from "../../application/GetMediasByPlaceIdUseCase.js";
import PopulateMediaByNumberUseCase from "../../application/PopulateMediaByNumberUseCase.js";
import PopulateMediaByTopicUseCase from "../../application/PopulateMediaByTopicUseCase.js";
import TranslateMediaUseCase from "../../application/TranslateMediaUseCase.js";
import UpdateMediaAndAssociatedRoutesUseCase from "../../application/UpdateMediaAndAssociatedRoutesUseCase.js";
import IMedia from "../../domain/IMedia";
import { checkToken } from "../../../middleware/auth.js";

const resolvers = {
  Mutation: {
    populateMediaByNumber: async (
      parent: any,
      args: { placeId: string; number?: number; lang?: any },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return PopulateMediaByNumberUseCase({
        placeId: args.placeId,
        number: args.number,
        lang: args.lang?.replace("_", "-"),
      });
    },
    populateMediaByTopic: async (
      parent: any,
      args: {
        placeId: string;
        topic?: string;
        lang?: any;
      },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return PopulateMediaByTopicUseCase({
        placeId: args.placeId,
        topic: args.topic,
        lang: args.lang?.replace("_", "-"),
      });
    },

    translateMedia: async (
      parent: any,
      args: { id: string; outputLang: any },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return TranslateMediaUseCase({
        id: args.id,
        outputLang: args.outputLang?.replace("_", "-"),
      });
    },
    updateMedia: (
      parent: any,
      args: { id: string; mediaUpdate: Partial<IMedia> },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return UpdateMediaAndAssociatedRoutesUseCase(args.id, args.mediaUpdate);
    },
    deleteMedia: (
      parent: any,
      args: { id: string },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return DeleteMediaAndUpdatedAssociatedRoutesUseCase(args.id);
    },
  },
  Query: {
    media: (
      parent: any,
      { id }: { id: string },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return GetMediaByIdUseCase(id);
    },
    medias: async (
      parent: any,
      args: { placeId: string; lang: string },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return GetMediasByPlaceIdUseCase(args.placeId, args.lang);
    },
  },
};

export default resolvers;
