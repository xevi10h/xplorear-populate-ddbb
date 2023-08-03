const typeDefs = `#graphql
type Coordinates {
    lat: Float!
    lng: Float!
  }

  type Address {
    coordinates: Coordinates!
    street: String
    city: String!
    postalCode: String
    province: String
    country: String!
  }

  type Place {
    id: ID
    name: String!
    address: Address!
    description: String!
    importance: Int!
    rating: Float
    types: [String]
  }

  type Query {
    place(id: ID!): Place
    places: [Place]
  }

  type Mutation {
    createPlace(
      name: String!
      address: AddressInput!
      description: String!
      importance: Int!
      rating: Float
      types: [String]
    ): Place
    updatePlace(id: ID!, data: UpdatePlaceInput!): Place
    deletePlace(id: ID!): Boolean
  }

  input CoordinatesInput {
    lat: Float!
    lng: Float!
  }

  input AddressInput {
    coordinates: CoordinatesInput!
    street: String
    city: String!
    postalCode: String
    province: String
    country: String!
  }

  input UpdatePlaceInput {
    name: String
    address: AddressInput
    description: String
    importance: Int
    rating: Float
    types: [String]
  }
`;
export default typeDefs;
