import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import multer from "multer";

import { connect } from "./database/connect.js";
import { authRouter } from "./routes/auth.js";
import { eventRouter } from "./routes/event.js";

dotenv.config();

const app = express();

const upload = multer({
	limits: {
		fileSize: 10 * 1024 * 1024, // 10 MB
		parts: 5,
		fields: 50,
	},
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
		method: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(cookieParser());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(upload.single("eventCover"));

app.use("/api/auth", authRouter);
app.use("/api/event", eventRouter);

try {
	connect();
} catch (err) {
	console.log(err);
}

export default app;
