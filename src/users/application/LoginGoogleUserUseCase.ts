import jwt from "jsonwebtoken";
import { MongoUserModel } from "../infrastructure/mongoModel/MongoUserModel.js";
import IUser from "../domain/IUser.js";

interface LoginGoogleUserDTO {
  email: string;
  googleId: string;
  name?: string;
  photo?: string;
  language?: string;
}

export default async function LoginGoogleUserUseCase({
  email,
  name,
  googleId,
  photo,
  language,
}: LoginGoogleUserDTO): Promise<IUser> {
  let user = await MongoUserModel.findOne({ email });
  if (!user) {
    let userIsAlreadyTaken = true;
    let username = email.split("@")[0];
    while (userIsAlreadyTaken) {
      if (await MongoUserModel.findOne({ username })) {
        username = username + "1";
      } else {
        userIsAlreadyTaken = false;
      }
    }
    user = new MongoUserModel({
      name,
      username,
      email,
      googleId,
      photo,
      createdAt: new Date(),
      language: language || "en_US",
    });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email.toLowerCase(), username: user.username },
    process.env.SECRET_KEY!,
    {
      expiresIn: "1d",
    }
  );
  user.token = token;
  return user.save();
}
