import User from "../models/User";

export default interface UserRepository {
  signup(user: User): Promise<User>;
  getByUsername(username: string): Promise<User | null | undefined>;
  getByEmail(email: string): Promise<User | null | undefined>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
