import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes"; // Import the fileRoutes
import * as dotenv from "dotenv"; // Import dotenv
import router from "./routes/index";

const env = process.env.NODE_ENV || "development";
dotenv.config({
	path: `.env.${env}`,
});

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: true }));
app.use("/", router.promtRouter);
app.use("/files", fileRoutes);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
