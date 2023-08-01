import mongoose from "mongoose";

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://root:password@mongo:27017"
);

const connection = mongoose.connection;

connection.once("open", async () => {
  console.log("Mongodb connection established");
});

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
});

export default connection;
