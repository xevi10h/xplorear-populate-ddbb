import { Request, Response } from "express";
import RouteRepository from "../../domain/repositories/RouteRepository";
import RouteService from "../../application/RouteService";
import PopulateRoutesUseCase from "../../application/populateRoutes/PopulateRoutesUseCase";
import { MongoRouteModel } from "../mongoModel/MongoRouteModel";
import populateRoutesValidator from "../validators/PopulateRoutesValidator";
import MongoRouteRepository from "../repositories/MongoRouteRepository";
import PlaceRepository from "../../../places/domain/repositories/PlaceRepository";
import MongoPlaceRepository from "../../../places/infrastructure/repositories/MongoPlaceRepository";
import { MongoPlaceModel } from "../../../places/infrastructure/mongoModel/MongoPlaceModel";
import MediaRepository from "../../../media/domain/repositories/MediaRepository";
import MongoMediaRepository from "../../../media/infrastructure/repositories/MongoMediaRepository";
import { MongoMediaModel } from "../../../media/infrastructure/mongoModel/MongoMediaModel";
import PlaceService from "../../../places/application/PlaceService";
import MediaService from "../../../media/application/MediaService";

const routeRepository: RouteRepository = new MongoRouteRepository(
  MongoRouteModel
);
const placeRepository: PlaceRepository = new MongoPlaceRepository(
  MongoPlaceModel
);
const mediaRepository: MediaRepository = new MongoMediaRepository(
  MongoMediaModel
);

const routeService = new RouteService(routeRepository);
const placeService = new PlaceService(placeRepository);
const mediaService = new MediaService(mediaRepository);

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
