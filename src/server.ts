import express from "express";
import cors from "cors";
import { placeRoutes } from "./places/infrastructure/routes";
import { mediaRoutes } from "./media/infrastructure/routes";
import { userRoutes } from "./user/infrastructure/routes";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import placesTypeDefs from "./places/infrastructure/graphql/schema";
import mediaTypeDefs from "./media/infrastructure/graphql/schema";
import placesResolvers from "./places/infrastructure/graphql/resolvers";
import mediaResolvers from "./media/infrastructure/graphql/resolvers";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/places", placeRoutes);
app.use("/media", mediaRoutes);
app.use("/users", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

interface MyContext {
  token?: String;
}

const typeDefs = mergeTypeDefs([placesTypeDefs, mediaTypeDefs]);
const resolvers = mergeResolvers([placesResolvers, mediaResolvers]);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: 4000`);
export default app;
