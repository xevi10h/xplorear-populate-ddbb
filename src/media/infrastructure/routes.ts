import { Router } from "express";
import { PopulatePlacesController } from "./controllers/PopulatePlacesController";
import connection from "./database/MongoDB";

const placeRoutes = Router();

placeRoutes.post("/many", PopulatePlacesController);

export { placeRoutes };

connection;
