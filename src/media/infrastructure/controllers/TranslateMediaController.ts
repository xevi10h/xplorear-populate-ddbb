import { Request, Response } from "express";
import MediaRepository from "../../domain/repositories/MediaRepository";
import MongoMediaRepository from "../repositories/MongoMediaRepository";
import MediaService from "../../application/media/MediaService";
import TranslateMediaUseCase from "../../application/media/translateMedia/TranslateMediaUseCase";
import { MongoMediaModel } from "../mongoModel/MongoMediaModel";
import translateMediaValidator from "../validators/TranslateMediaValidator";
import PlaceService from "../../application/place/PlaceService";
import PlaceRepository from "../../domain/repositories/PlaceRepository";
import MongoPlaceRepository from "../repositories/MongoPlaceRepository";
import { MongoPlaceModel } from "../../../places/infrastructure/mongoModel/MongoPlaceModel";

const mediaRepository: MediaRepository = new MongoMediaRepository(
  MongoMediaModel
);

const mediaService = new MediaService(mediaRepository);

const translateMediaUseCase = new TranslateMediaUseCase(mediaService);

export const TranslateMediaController = async (req: Request, res: Response) => {
  try {
    const mediaId = req.params.mediaId;
    const { error } = translateMediaValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await translateMediaUseCase.execute({
      outputLang: req.body.outputLang,
      mediaId,
    });
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
