export default interface IUser {
  id?: string;
  email: string;
  username: string;
  createdAt: Date;
  name?: string;
  photo?: string;
  hashedPassword?: string;
  googleId?: string;
  token?: string;
}
