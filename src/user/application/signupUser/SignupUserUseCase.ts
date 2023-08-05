import SignupUserDTO from "./SignupUserDTO";
import AuthService from "../AuthService";
import bcrypt from "bcryptjs";
import User from "../../domain/models/User";

export default class SignupUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(signupUserDTO: SignupUserDTO): Promise<void> {
    const { id, username, email, password } = signupUserDTO;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      id,
      username,
      email,
      hashedPassword,
    });
    await this.authService.signupUser(user);
  }
}
