import { Router } from "express";
import { PopulatePlacesController } from "./controllers/PopulatePlacesController";
import connection from "./database/MongoDB";

const placeRoutes = Router();

placeRoutes.post("/populate", PopulatePlacesController);

export { placeRoutes };

connection;
