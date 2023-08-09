import { Request, Response } from "express";
import MediaRepository from "../../domain/repositories/MediaRepository";
import MongoMediaRepository from "../repositories/MongoMediaRepository";
import MediaService from "../../application/media/MediaService";
import FillMediaDurationUseCase from "../../application/media/fillMediaDuration/FillMediaDurationUseCase";
import { MongoMediaModel } from "../mongoModel/MongoMediaModel";
import fillMediaDurationValidator from "../validators/FillMediaDurationValidator";

const mediaRepository: MediaRepository = new MongoMediaRepository(
  MongoMediaModel
);

const mediaService = new MediaService(mediaRepository);

const fillMediaDurationUseCase = new FillMediaDurationUseCase(mediaService);

export const FillMediaDurationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { error } = fillMediaDurationValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await fillMediaDurationUseCase.execute({
      mediaIds: req.body,
    });
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
