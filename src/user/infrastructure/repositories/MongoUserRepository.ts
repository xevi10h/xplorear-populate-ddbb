import User from "../../domain/models/User";
import UserRepository from "../../domain/repositories/UserRepository";
import { Model } from "mongoose";
import IUser from "../../domain/models/interfaces/IUser";

export default class MongoUserRepository implements UserRepository {
  constructor(private readonly UserModel: Model<IUser>) {}

  async signup(user: User): Promise<void> {
    console.log("user", user);
    await this.UserModel.create({ _id: user.id, ...user });
  }

  async getByUsername(username: string): Promise<User | null | undefined> {
    return this.UserModel.findOne({ username }).exec();
  }

  async save(user: User): Promise<void> {
    await this.UserModel.updateOne({ _id: user.id }, user);
  }

  async delete(_id: string): Promise<void> {
    await this.UserModel.deleteOne({ _id });
  }

  async getById(_id: string): Promise<User | null | undefined> {
    return this.UserModel.findById(_id).exec();
  }
}
