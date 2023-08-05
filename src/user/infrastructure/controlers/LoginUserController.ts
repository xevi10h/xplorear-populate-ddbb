import { Request, Response } from "express";
import UserRepository from "../../domain/repositories/UserRepository";
import MongoUserRepository from "../repositories/MongoUserRepository";
import AuthService from "../../application/AuthService";
import LoginUserUseCase from "../../application/loginUser/LoginUserUseCase";
import { MongoUserModel } from "../mongoModel/MongoUserModel";
import loginUserValidator from "../validators/LoginUserValidator";

const userRepository: UserRepository = new MongoUserRepository(MongoUserModel);

const authService = new AuthService(userRepository);
const loginUserUseCase = new LoginUserUseCase(authService);
export const LoginUserController = async (req: Request, res: Response) => {
  try {
    const { error } = loginUserValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const token = await loginUserUseCase.execute(req.body);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
