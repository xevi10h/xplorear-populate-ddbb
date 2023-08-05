import { Request, Response } from "express";
import UserRepository from "../../domain/repositories/UserRepository";
import MongoUserRepository from "../repositories/MongoUserRepository";
import AuthService from "../../application/AuthService";
import LoginGoogleUserUseCase from "../../application/loginGoogleUser/LoginGoogleUserUseCase";
import { MongoUserModel } from "../mongoModel/MongoUserModel";
import loginGoogleUserValidator from "../validators/LoginGoogleUserValidator";

const userRepository: UserRepository = new MongoUserRepository(MongoUserModel);

const authService = new AuthService(userRepository);
const loginGoogleUserUseCase = new LoginGoogleUserUseCase(authService);
export const LoginGoogleUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const { error } = loginGoogleUserValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const token = await loginGoogleUserUseCase.execute(req.body);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
