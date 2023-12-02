import express from "express";
import multer from "multer";
import { MIME_TYPES } from "../utilities/constants";

const router = express.Router();

const upload = multer({
	dest: "uploads/",
	fileFilter: (req, file, cb) => {
		if (MIME_TYPES.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error("File type not allowed"));
		}
	},
});

router.post("/upload", upload.single("file"), (req: express.Request, res: express.Response) => {
	const uploadedFile = req.file;

	if (!uploadedFile) {
		return res.status(400).send("No file uploaded.");
	}
	return res.status(200).send("File uploaded successfully.");
});

export default router;
