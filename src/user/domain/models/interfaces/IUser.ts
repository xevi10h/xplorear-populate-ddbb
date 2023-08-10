import { Types } from "mongoose";

export default interface IUser {
  _id?: Types.ObjectId;
  email: string;
  username: string;
  createdAt: Date;
  name?: string;
  photo?: string;
  hashedPassword?: string;
  googleId?: string;
  token?: string;
}
