import { Router } from "express";
import { LoginUserController } from "./controlers/LoginUserController";
import { SignupUserController } from "./controlers/SignupUserController";
import connection from "./database/MongoDB";

const userRoutes = Router();

// Registro de usuario
userRoutes.post("/signup", SignupUserController);

// Inicio de sesión
userRoutes.post("/login", LoginUserController);

export { userRoutes };

connection;
