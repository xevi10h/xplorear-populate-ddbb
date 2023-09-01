import gql from "graphql-tag";

const typeDefs = gql`
  type Route {
    id: ID
    title: String!
    description: String!
    rating: Float!
    mediaIds: [ID]
    duration: Float
  }

  type Mutation {
    populateRoutes(
      place: String! # Normally will be the city, zone or neighborhood
      topic: String
      stops: Int # The number of new we want to add (1 if not specified)
      number: Int
    ): [Route]
  }

  type Query {
    route(id: ID!): Route
  }
`;
export default typeDefs;
