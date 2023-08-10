import User from "../../domain/models/User";
import UserRepository from "../../domain/repositories/UserRepository";
import { Model } from "mongoose";
import IUser from "../../domain/models/interfaces/IUser";

export default class MongoUserRepository implements UserRepository {
  constructor(private readonly UserModel: Model<IUser>) {}

  async signup(user: User): Promise<User> {
    return this.UserModel.create(user);
  }

  async getByUsername(username: string): Promise<User | null | undefined> {
    return this.UserModel.findOne({ username }).exec();
  }

  async getByEmail(email: string): Promise<User | null | undefined> {
    return this.UserModel.findOne({ email }).exec();
  }

  async save(user: User): Promise<void> {
    await this.UserModel.updateOne({ _id: user._id.toString() }, user);
  }

  async delete(_id: string): Promise<void> {
    await this.UserModel.deleteOne({ _id });
  }

  async getById(_id: string): Promise<User | null | undefined> {
    return this.UserModel.findById(_id).exec();
  }
}
