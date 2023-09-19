import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import "./connection.js";
import usersTypeDefs from "./users/infrastructure/graphql/schema.js";
import usersResolvers from "./users/infrastructure/graphql/resolvers.js";
import mediasTypeDefs from "./medias/infrastructure/graphql/schema.js";
import mediasResolvers from "./medias/infrastructure/graphql/resolvers.js";
import routesTypeDefs from "./routes/infrastructure/graphql/schema.js";
import routesResolvers from "./routes/infrastructure/graphql/resolvers.js";
import placesTypeDefs from "./places/infrastructure/graphql/schema.js";
import placesResolvers from "./places/infrastructure/graphql/resolvers.js";

dotenv.config();

const typeDefs = mergeTypeDefs([
  usersTypeDefs,
  mediasTypeDefs,
  routesTypeDefs,
  placesTypeDefs,
]);
const resolvers = mergeResolvers([
  usersResolvers,
  mediasResolvers,
  routesResolvers,
  placesResolvers,
]);

interface MyContext {
  token: string;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    token: req.headers.authorization || "",
  }),
});

console.log(`🚀  Server ready at: ${url}`);
