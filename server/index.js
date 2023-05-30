import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";

const PORT = process.env.PORT;

// <===============================------<Route Import>------=====================================>
import userRoutes from "./routes/users.js";
import askQuestionroutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";

const app = express();
app.use(
	express.json({
		limit: "30mb",
		extended: true,
	})
);
app.use(
	express.urlencoded({
		limit: "30mb",
		extended: true,
	})
);
app.use(cors());

app.get("/", (req, res) => {
	res.send("Don,t know why you are opening this..Although it's of no use ");
});
dotenv.config();
//
// <========================================> Routes <==========================================>
//
//
app.use("/user", userRoutes);
app.use("/question", askQuestionroutes);
app.use("/answer", answerRoutes);

//  <===============================>----mongoose connection-----<=============================>

const DATABASE_URL = `mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@ac-djamdbn-shard-00-00.qsgamkm.mongodb.net:27017,ac-djamdbn-shard-00-01.qsgamkm.mongodb.net:27017,ac-djamdbn-shard-00-02.qsgamkm.mongodb.net:27017/?ssl=true&replicaSet=atlas-39xi0r-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose
	.connect(DATABASE_URL, {
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`server is running at port ${PORT}`);
			console.log(`Connected to data base.`);
		})
	)
	.catch((err) => {
		console.log(err.message);
	});
