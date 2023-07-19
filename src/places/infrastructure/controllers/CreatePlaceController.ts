import { Request, Response } from "express";
import PlaceRepository from "../../domain/repositories/PlaceRepository";
import MongoPlaceRepository from "../repositories/MongoPlaceRepository";
import PlaceService from "../../application/PlaceService";
import CreatePlaceUseCase from "../../application/createPlace/CreatePlaceUseCase";
import { MongoPlaceModel } from "../mongoModel/MongoPlaceModel";
import createPlaceValidator from "../validators/CreatePlaceValidator";

const placeRepository: PlaceRepository = new MongoPlaceRepository(
  MongoPlaceModel
);

const placeService = new PlaceService(placeRepository);
const createPlaceUseCase = new CreatePlaceUseCase(placeService);
export const CreatePlaceController = async (req: Request, res: Response) => {
  try {
    // const {error} = createPlaceValidator.validate(req.body);
    // if (error){
    // 	return res.status(400).json({ error: error.details[0].message });
    // }
    await createPlaceUseCase.execute(req.body);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
