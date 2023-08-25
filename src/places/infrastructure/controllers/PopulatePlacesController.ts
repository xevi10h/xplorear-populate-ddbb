import { Request, Response } from "express";
import PlaceService from "../../application/PlaceService";
import PopulatePlacesByZoneUseCase from "../../application/populatePlaces/PopulatePlacesByZoneUseCase";
import { MongoPlaceModel } from "../mongoModel/MongoPlaceModel";
import populatePlacesValidator from "../validators/PopulatePlacesValidator";
import { MongoMediaModel } from "../../../media/infrastructure/mongoModel/MongoMediaModel";
import MediaService from "../../../media/application/MediaService";

const placeService = new PlaceService(MongoPlaceModel);
const mediaService = new MediaService(MongoMediaModel);
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
