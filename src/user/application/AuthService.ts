import { Model } from "mongoose";
import User from "../domain/models/User";
import IUser from "../domain/models/interfaces/IUser";

export default class AuthService {
  constructor(private readonly UserModel: Model<IUser>) {}

  async signupUser(user: User): Promise<User> {
    return this.UserModel.create(user);
  }

  async getByUsername(username: string): Promise<User | null | undefined> {
    return this.UserModel.findOne({ username });
  }

  async getByEmail(email: string): Promise<User | null | undefined> {
    return this.UserModel.findOne({ email });
  }

  async save(user: User): Promise<void> {
    await this.UserModel.updateOne({ _id: user._id.toString() }, user);
  }
}
