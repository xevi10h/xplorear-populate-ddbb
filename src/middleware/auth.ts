import { ApolloError, AuthenticationError } from "apollo-server-errors";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY!;

export const checkToken = (authorization: string) => {
  if (!authorization) {
    throw new GraphQLError("No token provided", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new GraphQLError("Token format not valid", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }

  try {
    const user = jwt.verify(token, SECRET_KEY);
    return user;
  } catch (error) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
