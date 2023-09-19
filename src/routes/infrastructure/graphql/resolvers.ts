import PopulateRoutesUseCase from "../../application/PopulateRoutesUseCase.js";
import GetRouteByIdUseCase from "../../application/GetRouteByIdUseCase.js";
import AddExistingMediaToRouteUseCase from "../../application/AddExistingMediaToRouteUseCase.js";
import { checkToken } from "../../../middleware/auth.js";

const resolvers = {
  Mutation: {
    populateRoutes: async (
      parent: any,
      args: { place: string; topic: string; stops?: number; number?: number },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return PopulateRoutesUseCase({
        place: args.place,
        topic: args.topic,
        stops: args.stops,
        number: args.number,
      });
    },
    addExistingMediaToRoute: async (
      parent: any,
      args: { id: string; mediaId: string },
      { token }: { token: string }
    ) => {
      checkToken(token);
      return AddExistingMediaToRouteUseCase(args.id, args.mediaId);
    },
  },

  Query: {
    route: async (
      parent: any,
      args: { id: string },
      { token }: { token: string }
    ) => {
      checkToken(token);
      const route = await GetRouteByIdUseCase({ id: args.id });
      return route;
    },
  },
};

export default resolvers;
