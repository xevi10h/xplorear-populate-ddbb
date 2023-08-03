import express from "express";
import cors from "cors";
import { placeRoutes } from "./places/infrastructure/routes";
import { mediaRoutes } from "./media/infrastructure/routes";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./places/infrastructure/graphql/schema";
import resolvers from "./places/infrastructure/graphql/resolvers";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/places", placeRoutes);
app.use("/media", mediaRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: 4000`);
export default app;
