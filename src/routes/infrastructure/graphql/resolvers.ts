import PopulateRoutesUseCase from "../../application/PopulateRoutesUseCase";
import GetRouteByIdUseCase from "../../application/GetRouteByIdUseCase";

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
  },

  Query: {
    route: async (parent: any, args: { id: string }) => {
      const route = await GetRouteByIdUseCase({ id: args.id });
      console.log(route);
      return route;
    },
  },
};

export default resolvers;