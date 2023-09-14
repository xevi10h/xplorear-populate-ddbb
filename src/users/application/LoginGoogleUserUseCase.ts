import jwt from "jsonwebtoken";
import { MongoUserModel } from "../infrastructure/mongoModel/MongoUserModel";
import IUser from "../domain/IUser";

interface LoginGoogleUserDTO {
  email: string;
  googleId: string;
  name?: string;
  photo?: string;
}

export default async function LoginGoogleUserUseCase({
  email,
  name,
  googleId,
  photo,
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
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  user.token = token;
  return user.save();
}
