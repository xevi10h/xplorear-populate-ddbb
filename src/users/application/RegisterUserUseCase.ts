import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import IUser from "../domain/IUser";
import { MongoUserModel } from "../infrastructure/mongoModel/MongoUserModel";
import { ApolloError } from "apollo-server-errors";

interface RegisterUserDTO {
  email: string;
  password: string;
  username?: string;
}

export default async function RegisterUserUseCase({
  email,
  password,
  username,
}: RegisterUserDTO) {
  // See if an old user exists with email attempting to register
  if (await MongoUserModel.findOne({ email })) {
    throw new ApolloError(
      `A user is already registered with the email ${email}`,
      `USER_ALREADY_EXISTS`
    );
  }
  // Create a username based in the email in case we dont have it
  if (!username) {
    let usernameIsAlreadyTaken = true;
    username = email.split("@")[0];
    while (usernameIsAlreadyTaken) {
      if (await MongoUserModel.findOne({ username })) {
        username = username + "1";
      } else {
        usernameIsAlreadyTaken = false;
      }
    }
  }
  //Encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);
  // Build out mongoose model (User)
  const newUser = new MongoUserModel({
    username,
    email: email.toLowerCase(),
    password: encryptedPassword,
    createdAt: new Date(),
  });
  // Create JWT
  const token = jwt.sign(
    { email: email.toLowerCase(), username },
    "UNSAFE_STRING",
    { expiresIn: "1d" }
  );
  newUser.token = token;
  return newUser.save();
}
