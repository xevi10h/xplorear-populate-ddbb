import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");

const connection = mongoose.connection;

connection.once("open", async () => {
  console.log("Mongodb connection established");
});

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
});

export default connection;
