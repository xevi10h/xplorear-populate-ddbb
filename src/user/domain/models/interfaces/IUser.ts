export default interface IUser {
  id?: string;
  email: string;
  username: string;
  hashedPassword: string;
  token?: string;
}
