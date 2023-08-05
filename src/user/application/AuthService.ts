import User from "../domain/models/User";
import UserRepository from "../domain/repositories/UserRepository";

export default class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signupUser(user: User): Promise<User> {
    return await this.userRepository.signup(user);
  }

  async getByUsername(username: string): Promise<User | null | undefined> {
    return await this.userRepository.getByUsername(username);
  }

  async getByEmail(email: string): Promise<User | null | undefined> {
    return await this.userRepository.getByEmail(email);
  }

  async save(user: User): Promise<void> {
    return await this.userRepository.save(user);
  }
}
