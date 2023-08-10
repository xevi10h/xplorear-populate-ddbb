// import { Date } from "mongoose";
import { Types } from "mongoose";
import IUser from "./interfaces/IUser";

export default class User implements IUser {
  _id: Types.ObjectId;
  email: string;
  username: string;
  createdAt: Date;
  hashedPassword?: string;
  googleId?: string;
  token?: string;

  constructor(user: IUser) {
    this._id = new Types.ObjectId();
    this.email = user.email;
    this.username = user.username;
    this.hashedPassword = user.hashedPassword;
    this.createdAt = user.createdAt;
    this.googleId = user.googleId;
    this.token = user.token;
  }
}
