import { Model } from "mongoose";
import Route from "../domain/models/Route";
import IRoute from "../domain/models/interfaces/IRoute";

class RouteService {
  constructor(private readonly RouteModel: Model<IRoute>) {}

  async createOne(route: Route): Promise<void> {
    await this.RouteModel.create(route);
  }
}

export default RouteService;
