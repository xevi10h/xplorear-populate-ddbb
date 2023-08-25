import { Request, Response } from "express";
import MediaService from "../../application/MediaService";
import TranslateMediaUseCase from "../../application/translateMedia/TranslateMediaUseCase";
import { MongoMediaModel } from "../mongoModel/MongoMediaModel";
import translateMediaValidator from "../validators/TranslateMediaValidator";

const mediaService = new MediaService(MongoMediaModel);

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
