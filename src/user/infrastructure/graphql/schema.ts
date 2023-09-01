import gql from "graphql-tag";
const typeDefs = gql`
  input RegisterInput {
    username: String
    email: String!
    password: String!
  }

  input LoginInput {
    emailOrUsername: String!
    password: String!
  }

  input LoginGoogleInput {
    email: String!
    googleId: String!
    name: String
    photo: String
  }

  type User {
    id: ID
    email: String!
    username: String!
    googleId: String
    token: String
  }

  type Mutation {
    registerUser(registerInput: RegisterInput!): User
    loginUser(loginInput: LoginInput): User
    loginGoogleUser(loginGoogleInput: LoginGoogleInput): User
  }

  type Query {
    user(id: String!): User
  }
`;
export default typeDefs;
