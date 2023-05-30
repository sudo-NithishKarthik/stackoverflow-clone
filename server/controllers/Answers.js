import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
	//
	const { id: _id } = req.params;
	const { noOfAnweres, answerBody, userAnswered, userId } = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send("question is unavailable");
	}
	upDateNoOfAnsweres(_id, noOfAnweres);
	try {
		const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
			$addToSet: {
				answer: [{ answerBody, userAnswered, userId }],
			},
		});
		res.status(200).json(updatedQuestion);
		console.log("Posted answer successfully at controller postAnswer");
	} catch (error) {
		console.log("error in posting answer at controllers postAnswer");
		console.log(error);
		res.status(400).json("erroor");
	}
};

const upDateNoOfAnsweres = async (_id, noOfAnsweres) => {
	try {
		await Questions.findByIdAndUpdate(_id, {
			$set: { noOfAnweres: noOfAnsweres },
		});
	} catch (error) {}
};

export const deleteAnswer = async (req, res) => {
	//
	const { id: _id } = req.params;
	const { answerId, noOfAnweres } = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) {
		return res.status(404).send("question is unavailable");
	}
	if (!mongoose.Types.ObjectId.isValid(answerId)) {
		return res.status(404).send("Answer is unavailable");
	}
	upDateNoOfAnsweres(_id, noOfAnweres);

	try {
		await Questions.updateOne(
			{ _id },
			{ $pull: { answer: { _id: answerId } } }
		);
		res.status(200).json({ message: "Successfully deleted....." });
	} catch (error) {
		res.status(405).json({ message: "Error in deleting the anwers" });
	}
};
