import gql from "graphql-tag";

const typeDefs = gql`
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

  type Mutation {
    populateMediaByNumber(
      placeId: String!
      number: Int
      lang: Language
    ): [Media]
    populateMediaByTopic(placeId: String!, topic: String, lang: Language): Media
    translateMedia(mediaId: ID!, outputLang: Language!): Media
  }

  type Query {
    media(id: ID!): Media
    mediaOfPlace(placeId: ID!, lang: Language): [Media]
  }
`;
export default typeDefs;
