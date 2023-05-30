import * as api from "../api";

export const askQuestion = (questionData, navigate) => async (dispatch) => {
	try {
		const { data } = await api.postQuestion(questionData);
		dispatch({ type: "POST_QUESTION", payload: data });
		dispatch(fetchAllQuestions());
		navigate("/");
	} catch (error) {
		console.log("error in question posting at AskQuestion");
		console.log(error);
	}
};

export const fetchAllQuestions = () => async (dispatch) => {
	try {
		const { data } = await api.getAllQuestions();
		dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
	} catch (error) {
		console.log("error in question fetcinng at fetchAllQuestions");
		console.log(error);
	}
};

export const deleteQuestion = (id, navigate) => async (dispatch) => {
	try {
		await api.deleteQuestion(id);
		dispatch(fetchAllQuestions());
		navigate("/");
	} catch (error) {
		console.log("error at actions at deleteQuestion");
		console.log(error);
	}
};

export const postAnswer = (answerData) => async (dispatch) => {
	try {
		const { id, noOfAnweres, answerBody, userAnswered, userId } = answerData;
		const { data } = await api.postAnswer(
			id,
			noOfAnweres,
			answerBody,
			userAnswered,
			userId
		);
		dispatch({ type: "POST_ANSWER", payload: data });
		dispatch(fetchAllQuestions());
	} catch (error) {
		console.log("erorr at posting answer at actions at postAnswer");
		console.log(error);
	}
};

export const deleteAnswer = (id, answerId, noOfAnweres) => async (dispatch) => {
	try {
		await api.deleteAnswer(id, answerId, noOfAnweres);
		dispatch(fetchAllQuestions());
	} catch (error) {
		console.log("erorr at deleting answer at actions at deleteAnswer ");
		console.log(error);
	}
};

export const voteQuestion = (id, value, userId) => async (dispatch) => {
	try {
		console.log("started waiting for api to vote");
		const { data } = await api.voteQuestion(id, value, userId);
		console.log("completed waiting for api to vote");
		dispatch(fetchAllQuestions());
		console.log(data);
	} catch (error) {
		console.log("Error while voting at actions at voteQuestion");
		console.log(error);
	}
};
