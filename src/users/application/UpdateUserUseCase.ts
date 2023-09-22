import { GraphQLError } from "graphql";
import { MongoUserModel } from "../infrastructure/mongoModel/MongoUserModel.js";

interface UpdateUserUseCaseDTO {
  tokenUserId: string;
  id: string;
  username?: string;
  name?: string;
  photo?: string;
  language?: string;
}

export default function UpdateUserUserCase({
  tokenUserId,
  id,
  username,
  name,
  photo,
  language,
}: UpdateUserUseCaseDTO) {
  if (tokenUserId !== id) {
    throw new GraphQLError("You can only update your own user", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
  return MongoUserModel.findByIdAndUpdate(
    id,
    {
      username,
      name,
      photo,
      language,
    },
    { new: true }
  );
}
