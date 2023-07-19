import { Router } from "express";
import { CreatePlaceController } from "./controllers/CreatePlaceController";
import connection from "./database/MongoDB";

const placeRoutes = Router();

placeRoutes.post("/", CreatePlaceController);

export { placeRoutes };

connection;
