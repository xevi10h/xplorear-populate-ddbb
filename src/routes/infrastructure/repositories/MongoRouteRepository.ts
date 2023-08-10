import Route from "../../domain/models/Route";
import RouteRepository from "../../domain/repositories/RouteRepository";
import { Model } from "mongoose";
import IRoute from "../../domain/models/interfaces/IRoute";

export default class MongoRouteRepository implements RouteRepository {
  constructor(private readonly RouteModel: Model<IRoute>) {}

  async create(route: Route): Promise<void> {
    await this.RouteModel.create(route);
  }

  async save(route: Route): Promise<void> {
    await this.RouteModel.updateOne({ _id: route._id }, route);
  }

  async delete(_id: string): Promise<void> {
    await this.RouteModel.deleteOne({ _id });
  }

  async getById(_id: string): Promise<Route | null | undefined> {
    return this.RouteModel.findById(_id).exec();
  }

  async updateById(
    _id: string,
    update: Partial<Route>
  ): Promise<Route | null | undefined> {
    return this.RouteModel.findByIdAndUpdate(_id, update);
  }
}
