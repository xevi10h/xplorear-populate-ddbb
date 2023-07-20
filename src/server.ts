import express from "express";
import cors from "cors";
import { placeRoutes } from "./places/infrastructure/routes";
import { mediaRoutes } from "./media/infrastructure/routes";

const app = express();

app.use(cors({ origin: "http://localhost:8082" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/places", placeRoutes);
app.use("/media", mediaRoutes);

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
