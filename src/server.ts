import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { placeRoutes } from "./places/infrastructure/routes";

const app = express();

app.use(cors({ origin: "http://localhost:8082" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/places", placeRoutes);

app.post("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
