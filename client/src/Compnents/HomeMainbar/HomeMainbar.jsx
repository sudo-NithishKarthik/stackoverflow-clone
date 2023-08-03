import React from "react";
import "./HomeMainbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";

const HomeMainbar = () => {
	const questionsList = useSelector((state) => state.questionReducer);
	// console.log(questionsList);

	const location = useLocation();
	const navigate = useNavigate();
	const User = useSelector((state) => state.currentUserReducer);
	const checkAuth = () => {
		if (User === null) {
			alert("login/signup please");
			navigate("/auth");
		} else {
			navigate("/askquestion");
		}
	};

	return (
		<div className="main-bar">
			<div className="main-bar-header">
				{location.pathname === "/" ? (
					<h1>Top Questions</h1>
				) : (
					<h1>All Questions</h1>
				)}
				<button onClick={checkAuth} className="ask-btn">
					Ask Question
				</button>
			</div>
			<div>
				{questionsList.data === null ? (
					<h1>Loading...</h1>
				) : (
					<>
						<p className="total-questions">
							{questionsList.data.length} Questions
						</p>
						<QuestionList questionsList={questionsList.data} />
					</>
				)}
			</div>
		</div>
	);
};

export default HomeMainbar;
