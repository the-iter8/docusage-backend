import { Router } from "express";
import { OpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config();
const router = Router();

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.post("/prompt", async (req, res) => {
	try {
		const { prompt, type, secret_key } = req.body;

		const openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		});

		if (!secret_key || secret_key !== process.env.SECRET_KEY) {
			res.status(401).send("Unauthorized");
			return;
		}

		if (!type || !prompt) {
			res.status(400).send("Bad Request. Prompt or type is missing.");
			return;
		}

		let typePrompt = "";
		if (type === "summary") {
			typePrompt = "Summarize the following legal document in simple terms:";
		} else if (type === "question") {
			typePrompt = "Answer the following legal question:";
		} else if (type === "petition") {
			typePrompt =
				"Write a petition to the court based on following details (ensure that the format and structure is correct):";
		} else if (type === "agreement") {
			typePrompt =
				"Write a legal agreement based on mutual understanding between parties based on following details (ensure that the format and structure is correct):";
		} else if (type === "will") {
			typePrompt = "Write a will based on following details (ensure that the format and structure is correct):";
		}

		const result = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content:
						"You are a highly specialised legal assistant AI. You are able to answer legal questions and provide legal advice. Based on prompt, you'll summarise legal documents, answer legal questions, and provide legal advice.",
				},
				{
					role: "system",
					content: typePrompt,
				},
				{
					role: "user",
					content: prompt,
				},
			],
			model: "gpt-3.5-turbo",
		});
		console.log(result.choices);
		res.send(result.choices);
	} catch (err: any) {
		console.log(err);
		res.status(500).send(err.message);
	}
});

export default router;
