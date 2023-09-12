import { MongoUserModel } from "../mongoModel/MongoUserModel";
import LoginGoogleUserUseCase from "../../application/LoginGoogleUserUseCase";
import LoginUserUseCase from "../../application/LoginUserUseCase";
import RegisterUserUseCase from "../../application/RegisterUserUseCase";
import { GraphQLScalarType, Kind } from "graphql";

interface RegisterInput {
  registerInput: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginInput {
  loginInput: {
    emailOrUsername: string;
    password: string;
  };
}

interface LoginGoogleInput {
  loginGoogleInput: {
    email: string;
    googleId: string;
    name: string;
    photo: string;
  };
}

const resolvers = {
  Mutation: {
    registerUser: async (
      parent: any,
      { registerInput: { username, email, password } }: RegisterInput
    ) => {
      return RegisterUserUseCase({ username, email, password });
    },
    loginUser: async (
      parent: any,
      { loginInput: { emailOrUsername, password } }: LoginInput
    ) => {
      return LoginUserUseCase({ emailOrUsername, password });
    },
    loginGoogleUser: async (
      parent: any,
      { loginGoogleInput: { email, googleId, name, photo } }: LoginGoogleInput
    ) => {
      return LoginGoogleUserUseCase({ email, googleId, name, photo });
    },
  },
  Query: {
    getUserById: async (parent: any, args: { id: string }) => {
      return MongoUserModel.findById(args.id);
    },
  },

  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Una fecha y hora, representada como una cadena ISO-8601",
    serialize(value: unknown): string {
      if (!(value instanceof Date)) {
        throw new Error("El valor no es una instancia de Date");
      }
      return value.toISOString();
    },
    parseValue(value: unknown): Date {
      if (!(value instanceof Date)) {
        throw new Error("El valor no es una instancia de Date");
      }
      return new Date(value); // Recibe la fecha del cliente
    },
    parseLiteral(ast): Date | null {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value); // Recibe la fecha del AST
      }
      return null;
    },
  }),
};

export default resolvers;
