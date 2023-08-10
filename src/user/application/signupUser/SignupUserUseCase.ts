import SignupUserDTO from "./SignupUserDTO";
import AuthService from "../AuthService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../domain/models/User";
import EmailIsAlreadyTakenError from "../../domain/exceptions/EmailIsAlreadyTakenError";

export default class SignupUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(signupUserDTO: SignupUserDTO): Promise<string> {
    const { email, password } = signupUserDTO;
    if (await this.authService.getByEmail(email)) {
      throw new EmailIsAlreadyTakenError("Email is already taken");
    }
    let userIsAlreadyTaken = true;
    let username = email.split("@")[0];
    while (userIsAlreadyTaken) {
      if (await this.authService.getByUsername(username)) {
        username = username + "1";
      } else {
        userIsAlreadyTaken = false;
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      hashedPassword,
      createdAt: new Date(),
    });
    const userCreated = await this.authService.signupUser(user);
    const token = jwt.sign({ userId: userCreated._id }, "secret", {
      expiresIn: "1d",
    });
    user.token = token;
    this.authService.save(user);
    return token;
  }
}
