import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import InvalidCredentialsError from "../../domain/exceptions/InvalidCredentialsError";
import AuthService from "../AuthService";
import LoginGoogleUserDTO from "./LoginGoogleUserDTO";
import User from "../../domain/models/User";

export default class LoginGoogleUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(loginGoogleUserDTO: LoginGoogleUserDTO): Promise<string> {
    const { email, name, id, photo } = loginGoogleUserDTO;
    let user = await this.authService.getByEmail(email);
    if (!user) {
      let userIsAlreadyTaken = true;
      let username = email.split("@")[0];
      while (userIsAlreadyTaken) {
        if (await this.authService.getByUsername(username)) {
          username = username + "1";
        } else {
          userIsAlreadyTaken = false;
        }
      }
      const userToRegister = new User({
        name,
        username,
        email,
        googleId: id,
        photo,
        createdAt: new Date(),
      });
      user = await this.authService.signupUser(userToRegister);
    }
    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1d" });
    user.token = token;
    this.authService.save(user);
    return token;
  }
}
