import { Request, Response } from "express";
import RouteService from "../../application/RouteService";
import PopulateRoutesUseCase from "../../application/populateRoutes/PopulateRoutesUseCase";
import { MongoRouteModel } from "../mongoModel/MongoRouteModel";
import populateRoutesValidator from "../validators/PopulateRoutesValidator";
import { MongoPlaceModel } from "../../../places/infrastructure/mongoModel/MongoPlaceModel";
import { MongoMediaModel } from "../../../media/infrastructure/mongoModel/MongoMediaModel";
import PlaceService from "../../../places/application/PlaceService";
import MediaService from "../../../media/application/MediaService";

const placeService = new PlaceService(MongoPlaceModel);
const mediaService = new MediaService(MongoMediaModel);
const routeService = new RouteService(MongoRouteModel);

const populateRoutesUseCase = new PopulateRoutesUseCase(
  routeService,
  placeService,
  mediaService
);
export const PopulateRoutesController = async (req: Request, res: Response) => {
  try {
    const { error } = populateRoutesValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await populateRoutesUseCase.execute(req.body);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
