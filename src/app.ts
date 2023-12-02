import express from "express";
import cors from "cors";
import { ROUTES } from "./utilities/constants";
import fileRoutes from "./routes/fileRoutes"; // Import the fileRoutes
import * as dotenv from "dotenv"; // Import dotenv

const env = process.env.NODE_ENV || "development";
dotenv.config({
	path: `.env.${env}`,
});

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use("/files", fileRoutes);

app.get(ROUTES.BASE, (req, res) => {
	res.send("I think you're tryna get some resource. But unfortunately it's just 404 here.");
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
