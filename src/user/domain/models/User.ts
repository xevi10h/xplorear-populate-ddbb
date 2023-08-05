// import { Date } from "mongoose";
import IUser from "./interfaces/IUser";

export default class User implements IUser {
  id?: string;
  email: string;
  username: string;
  createdAt: Date;
  hashedPassword?: string;
  googleId?: string;
  token?: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.hashedPassword = user.hashedPassword;
    this.createdAt = user.createdAt;
    this.googleId = user.googleId;
    this.token = user.token;
  }
}
