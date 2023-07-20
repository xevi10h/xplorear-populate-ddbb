import { Router } from "express";
import { PopulateMediaController } from "./controllers/PopulateMediaController";
import connection from "./database/MongoDB";

const mediaRoutes = Router();

mediaRoutes.post("/many", PopulateMediaController);

export { mediaRoutes };

connection;
