import { Router } from "express";
import connection from "./database/MongoDB";
import { PopulateRoutesController } from "./controllers/PopulateRoutesController";

const routesRoutes = Router();

routesRoutes.post("/populate", PopulateRoutesController);

export { routesRoutes };

connection;
