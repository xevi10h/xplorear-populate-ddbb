import Route from "../domain/models/Route";
import RouteRepository from "../domain/repositories/RouteRepository";

class RouteService {
  constructor(private readonly routeRepository: RouteRepository) {}

  async createOne(route: Route): Promise<void> {
    await this.routeRepository.create(route);
  }
}

export default RouteService;
