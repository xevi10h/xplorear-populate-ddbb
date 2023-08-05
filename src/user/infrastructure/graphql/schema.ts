const typeDefs = `#graphql
  type User {
    id: ID
    email: string;
    username: string;
    hashedPassword: string;
    token?: string;
  }
`;
export default typeDefs;
