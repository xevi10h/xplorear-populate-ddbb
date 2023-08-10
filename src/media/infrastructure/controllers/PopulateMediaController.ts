import { Request, Response } from "express";
import MediaRepository from "../../domain/repositories/MediaRepository";
import MongoMediaRepository from "../repositories/MongoMediaRepository";
import MediaService from "../../application/MediaService";
import PopulateMediaUseCase from "../../application/populateMedia/PopulateMediaUseCase";
import { MongoMediaModel } from "../mongoModel/MongoMediaModel";
import populateMediaValidator from "../validators/PopulateMediaValidator";
import PlaceService from "../../../places/application/PlaceService";
import PlaceRepository from "../../../places/domain/repositories/PlaceRepository";
import MongoPlaceRepository from "../../../places/infrastructure/repositories/MongoPlaceRepository";
import { MongoPlaceModel } from "../../../places/infrastructure/mongoModel/MongoPlaceModel";

const mediaRepository: MediaRepository = new MongoMediaRepository(
  MongoMediaModel
);
const placeRepository: PlaceRepository = new MongoPlaceRepository(
  MongoPlaceModel
);

const mediaService = new MediaService(mediaRepository);
const placeService = new PlaceService(placeRepository);

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
