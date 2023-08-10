import { Request, Response } from "express";
import PlaceRepository from "../../domain/repositories/PlaceRepository";
import MongoPlaceRepository from "../repositories/MongoPlaceRepository";
import PlaceService from "../../application/PlaceService";
import PopulatePlacesByZoneUseCase from "../../application/populatePlaces/PopulatePlacesByZoneUseCase";
import { MongoPlaceModel } from "../mongoModel/MongoPlaceModel";
import populatePlacesValidator from "../validators/PopulatePlacesValidator";
import MediaRepository from "../../../media/domain/repositories/MediaRepository";
import MongoMediaRepository from "../../../media/infrastructure/repositories/MongoMediaRepository";
import { MongoMediaModel } from "../../../media/infrastructure/mongoModel/MongoMediaModel";
import MediaService from "../../../media/application/MediaService";

const placeRepository: PlaceRepository = new MongoPlaceRepository(
  MongoPlaceModel
);
const mediaRepository: MediaRepository = new MongoMediaRepository(
  MongoMediaModel
);

const placeService = new PlaceService(placeRepository);
const mediaService = new MediaService(mediaRepository);
const populatePlacesByZoneUseCase = new PopulatePlacesByZoneUseCase(
  placeService,
  mediaService
);
export const PopulatePlacesByZoneController = async (
  req: Request,
  res: Response
) => {
  try {
    const { error } = populatePlacesValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await populatePlacesByZoneUseCase.execute(req.body);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
