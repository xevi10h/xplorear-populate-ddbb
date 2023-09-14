import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import connection from "./connection";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";
import { checkToken } from "./middleware/auth";

connection;

dotenv.config();

// Cargar automáticamente todos los schemas y resolvers
const allTypeDefs = loadFilesSync(
  path.join(__dirname, "./**/graphql/schema.*")
);
const allResolvers = loadFilesSync(
  path.join(__dirname, "./**/graphql/resolvers.*")
);

const typeDefs = mergeTypeDefs(allTypeDefs);
const resolvers = mergeResolvers(allResolvers);

interface MyContext {
  token?: String;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

export default startStandaloneServer(server, {
  context: async ({ req }) => checkToken(req.headers.authorization || ""),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: 4000`);
