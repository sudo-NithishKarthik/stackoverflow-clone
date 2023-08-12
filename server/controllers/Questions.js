import mongoose from "mongoose";
import Questions from "../models/Questions.js";
import Users from "../models/auth.js";

function canPostNewQuestion(questionsOnThatDay, subscriptionStatus) {
  if (subscriptionStatus == "free") return questionsOnThatDay < 1
  if (subscriptionStatus == "silver") return questionsOnThatDay < 5
  if (subscriptionStatus == "gold") return true
}

export const AskQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const postQuestion = new Questions(postQuestionData);
  try {
    // here I have to verify the subscription status of the user
    // get the user Id
    // get the total number of questions posted by the user on the given day
    console.log({ postQuestionData })
    let subscriptionStatus = (await Users.findOne({ _id: postQuestionData.userId }).exec()).subscriptionStatus
    console.log({ subscriptionStatus })
    let userQuestions = await Questions.find({ userId: postQuestionData.userId }).exec()
    let questionsOnThatDay = userQuestions?.filter(q => ((((Date.now() - q.askedOn) / 1000) / 60) / 60) / 24 <= 1).length
    console.log({ questionsOnThatDay, subscriptionStatus })
    if (!canPostNewQuestion(questionsOnThatDay, subscriptionStatus)) {
      throw new Error("Daily limit reacher. Please upgrade your subscription")
    }
    await postQuestion.save();
    res.status(200).json("Posted a question successfully");
  } catch (error) {
    res.status(409).json("coudn't post a question successfulllly");
    console.log(error);
  }
};

export const getAllQuestions = async (req, res) => {
  //
  try {
    const QuestionsList = await Questions.find();
    res.status(200).json(QuestionsList);
  } catch (error) {
    console.log("getAllQuestion Error");
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question is unavailable");
  }

  try {
    await Questions.findByIdAndRemove(_id);
    res.status(200).json({ message: "succefully deleted" });
  } catch (error) {
    console.log("Eroror in deleting the que at controller deleteQuestion");
    res.status(404).json(error);
  }
};
export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    console.log("Question not found fuckk bhaiiii");
    return res.status(404).send("question is unavailable");
  }

  try {
    console.log("Started finding que");
    const question = await Questions.findById(_id);
    // console.log(question);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(String(userId));
      } else {
        question.upVote = question.upVote.filter(
          (id) => id !== String(userId)
        );
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (downIndex === -1) {
        question.downVote.push(String(userId));
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await Questions.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "Voted successfuly" });
  } catch (error) {
    console.log("Error in voting at controller at voteQuestion");
    // console.log(error);
    res.status(404).json("error");
  }
};
