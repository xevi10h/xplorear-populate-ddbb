import IUser from "./interfaces/IUser";

export default class User implements IUser {
  id?: string;
  email: string;
  username: string;
  hashedPassword: string;
  token?: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.hashedPassword = user.hashedPassword;
    this.token = user.token;
  }
}
