import { MongoUserModel } from "../mongoModel/MongoUserModel";

const resolvers = {
  Query: {
    user: async (parent: any, args: { id: string }) => {
      return MongoUserModel.findById(args.id);
    },
  },
};

export default resolvers;
