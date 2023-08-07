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

  enum Language {
    en_US
    es_ES
    fr_FR
  }

  type Query {
    media(id: ID!): Media
    mediaOfPlace(placeId: ID!, lang: Language): [Media]
  }
`;
export default typeDefs;
