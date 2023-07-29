import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import multer from "multer";

// import { promisify } from "util";
// import redis from "async-redis";

import { connect } from "./database/connect.js";
import { authRouter } from "./routes/auth.js";
import { eventRouter } from "./routes/event.js";

dotenv.config();

const app = express();
// const client = redis.createClient();

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
		methods: ["GET", "POST", "PUT", "DELETE"],
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
	(async () => {
		await connect();
	})();
} catch (err) {
	console.log(err);
}

// const getAsync = promisify(client.get).bind(client);

//IIFE
// (async () => {
// 	try {
// 		await connect();

// 		// // Set a test key in Redis
// 		// await client.set("testKey", "Hello, Redis!");

// 		// // Get the value of the key from Redis
// 		// const value = await getAsync("testKey");
// 		// console.log("Value:", value);

// 		// // Quit the Redis client after all operations are done
// 		// client.quit();
// 	} catch (err) {
// 		// console.error("Redis Error:", err);
// 		// client.quit(); // Close the client in case of an error
// 		console.log("Server error", err);
// 	}
// })();

// client.on("error", (err) => {
// 	console.error("Redis Client Error", err);
// });

// client.on("end", () => {
// 	console.log("Disconnected from Redis.");
// });

export default app;
