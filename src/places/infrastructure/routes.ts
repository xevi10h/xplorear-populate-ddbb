import { Router } from "express";
import { PopulatePlacesByZoneController } from "./controllers/PopulatePlacesController";
import connection from "./database/MongoDB";

const placeRoutes = Router();

placeRoutes.post("/populateByZone", PopulatePlacesByZoneController);

export { placeRoutes };

connection;
