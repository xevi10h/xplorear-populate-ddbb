import mongoose from "mongoose";

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://xploreartech:XA229er147@cluster0.b0gluyp.mongodb.net/"
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
