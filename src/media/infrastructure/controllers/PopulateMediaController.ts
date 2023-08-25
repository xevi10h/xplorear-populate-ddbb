import { Request, Response } from "express";
import MediaService from "../../application/MediaService";
import PopulateMediaUseCase from "../../application/populateMedia/PopulateMediaUseCase";
import { MongoMediaModel } from "../mongoModel/MongoMediaModel";
import populateMediaValidator from "../validators/PopulateMediaValidator";
import PlaceService from "../../../places/application/PlaceService";
import { MongoPlaceModel } from "../../../places/infrastructure/mongoModel/MongoPlaceModel";

const mediaService = new MediaService(MongoMediaModel);
const placeService = new PlaceService(MongoPlaceModel);

const populateMediaUseCase = new PopulateMediaUseCase(
  mediaService,
  placeService
);

export const PopulateMediaController = async (req: Request, res: Response) => {
  try {
    const { error } = populateMediaValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await populateMediaUseCase.execute(req.body);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
