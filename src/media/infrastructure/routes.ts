import { Router } from "express";
import { PopulateMediaController } from "./controllers/PopulateMediaController";
import { TranslateMediaController } from "./controllers/TranslateMediaController";
import { FillMediaDurationController } from "./controllers/FillMediaDurationControler";
import connection from "./database/MongoDB";

const mediaRoutes = Router();

mediaRoutes.post("/populate", PopulateMediaController);
mediaRoutes.post("/:mediaId/translate", TranslateMediaController);
mediaRoutes.post("/fillDuration", FillMediaDurationController);

export { mediaRoutes };

connection;
