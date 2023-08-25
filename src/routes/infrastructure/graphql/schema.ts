const typeDefs = `#graphql
  type Route {
    id: ID
    title: String!
    description: String!
    rating: Float!
    mediaIds: [ID]
    duration: Float
  }

  type Query {
    route(id: ID!): Route
  }
`;
export default typeDefs;
