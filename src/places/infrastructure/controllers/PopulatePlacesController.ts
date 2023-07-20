import { Request, Response } from "express";
import PlaceRepository from "../../domain/repositories/PlaceRepository";
import MongoPlaceRepository from "../repositories/MongoPlaceRepository";
import PlaceService from "../../application/PlaceService";
import PopulatePlacesUseCase from "../../application/populatePlaces/PopulatePlacesUseCase";
import { MongoPlaceModel } from "../mongoModel/MongoPlaceModel";
import populatePlacesValidator from "../validators/PopulatePlacesValidator";

const placeRepository: PlaceRepository = new MongoPlaceRepository(
  MongoPlaceModel
);

const placeService = new PlaceService(placeRepository);
const populatePlacesUseCase = new PopulatePlacesUseCase(placeService);
export const PopulatePlacesController = async (req: Request, res: Response) => {
  try {
    const { error } = populatePlacesValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await populatePlacesUseCase.execute(req.body);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
