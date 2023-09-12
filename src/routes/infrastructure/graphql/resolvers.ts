import PopulateRoutesUseCase from "../../application/PopulateRoutesUseCase";
import GetRouteByIdUseCase from "../../application/GetRouteByIdUseCase";
import AddExistingMediaToRouteUseCase from "../../application/AddExistingMediaToRouteUseCase";

const resolvers = {
  Mutation: {
    populateRoutes: async (
      parent: any,
      args: { place: string; topic: string; stops?: number; number?: number }
    ) =>
      PopulateRoutesUseCase({
        place: args.place,
        topic: args.topic,
        stops: args.stops,
        number: args.number,
      }),
    addExistingMediaToRoute: async (
      parent: any,
      args: { id: string; mediaId: string }
    ) => AddExistingMediaToRouteUseCase(args.id, args.mediaId),
  },

  Query: {
    route: async (parent: any, args: { id: string }) => {
      const route = await GetRouteByIdUseCase({ id: args.id });
      return route;
    },
  },
};

export default resolvers;
