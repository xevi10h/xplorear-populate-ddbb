import { model, Schema } from "mongoose";
import IUser from "../../domain/models/interfaces/IUser";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  token: { type: String },
});

export const MongoUserModel = model("users", userSchema);
