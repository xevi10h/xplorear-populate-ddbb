const typeDefs = `#graphql
  type Media {
    id: ID
    placeId: ID
    title: String!
    text: String!
    lang: String!
    rating: Float!
    audioUrl: String!
    voiceId: String!
    duration: Float!
  }

  type Query {
    media(id: ID!): Media
    mediaOfPlace(placeId: ID!): [Media]
  }
`;
export default typeDefs;
