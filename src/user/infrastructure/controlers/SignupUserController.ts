import { Request, Response } from "express";
import UserRepository from "../../domain/repositories/UserRepository";
import MongoUserRepository from "../repositories/MongoUserRepository";
import SignupUserUseCase from "../../application/signupUser/SignupUserUseCase";
import { MongoUserModel } from "../mongoModel/MongoUserModel";
import AuthService from "../../application/AuthService";
import signupUserValidator from "../validators/SignupUserValidator";

const userRepository: UserRepository = new MongoUserRepository(MongoUserModel);

const authService = new AuthService(userRepository);
const signupUserUseCase = new SignupUserUseCase(authService);
export const SignupUserController = async (req: Request, res: Response) => {
  try {
    const { error } = signupUserValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await signupUserUseCase.execute(req.body);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
