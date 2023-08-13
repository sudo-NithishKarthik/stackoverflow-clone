import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("Profile")) {
		req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token
			}`;
	}
	return req;
});

export const login = (authData) => API.post("/user/login", authData);
export const signup = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
	API.post("/question/ask", questionData);
export const getAllQuestions = () => API.get("/question/get");
export const deleteQuestion = (id) => API.delete(`/question/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
	API.patch(`/question/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnweres, answerBody, userAnswered, userId) =>
	API.patch(`/answer/post/${id}`, {
		noOfAnweres,
		answerBody,
		userId,
		userAnswered,
	});

export const deleteAnswer = (id, answerId, noOfAnweres) =>
	API.patch(`/answer/delete/${id}`, { id, answerId, noOfAnweres });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
	API.patch(`/user/update/${id}`, updateData);

export const paymentRequest = (subType) => {
	if (subType === "silver") {
		const result = API.post("payment/orders?subType=silver");

		return result;
	}

	if (subType === "gold") {
		const result = API.post("payment/orders?subType=gold");

		return result;
	}
};

export const paymentStatus = (res) => {
	const response = API.post("payment/status", { ...res });
	return response;
};
