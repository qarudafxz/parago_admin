import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { connect } from "./database/connect.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
		method: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(morgan("tiny"));
app.disable("x-powered-by");

try {
	connect();
} catch (err) {
	console.log(err);
}

export default app;
