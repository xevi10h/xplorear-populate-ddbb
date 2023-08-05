import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MongoUserModel } from "../mongoModel/MongoUserModel";
import MongoUserRepository from "../repositories/MongoUserRepository";

const mongoUserRepository = new MongoUserRepository(MongoUserModel);

const resolvers = {
  Query: {
    user: async (parent: any, args: { id: string }) => {
      return mongoUserRepository.getById(args.id);
    },
  },
};

export default resolvers;
