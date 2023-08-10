import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import InvalidCredentialsError from "../../domain/exceptions/InvalidCredentialsError";
import AuthService from "../AuthService";
import LoginUserDTO from "./LoginUserDTO";

export default class LoginUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(loginUserDTO: LoginUserDTO): Promise<string> {
    const { emailOrUsername, password } = loginUserDTO;
    let user = await this.authService.getByUsername(emailOrUsername);
    if (!user) {
      user = await this.authService.getByEmail(emailOrUsername);
      if (!user) {
        throw new InvalidCredentialsError(`Invalid credentials`);
      }
    }
    const isMatch = await bcrypt.compare(password, user.hashedPassword || "");
    if (!isMatch) {
      throw new InvalidCredentialsError(`Invalid credentials`);
    }
    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1d" });
    user.token = token;
    this.authService.save(user);
    return token;
  }
}
