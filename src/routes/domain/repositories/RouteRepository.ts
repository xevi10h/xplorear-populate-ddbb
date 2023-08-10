import Route from "../models/Route";

export default interface RouteRepository {
  create(route: Route): Promise<void>;
  getById(id: string): Promise<Route | null | undefined>;
  save(route: Route): Promise<void>;
  delete(id: string): Promise<void>;
  updateById(
    _id: string,
    update: Partial<Route>
  ): Promise<Route | null | undefined>;
}
