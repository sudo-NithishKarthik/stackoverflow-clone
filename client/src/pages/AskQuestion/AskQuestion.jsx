import React from "react";
import "./AskQuestion.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../../actions/question.js";

const AskQuestion = () => {
	//
	const [questionTitle, setQuestionTitle] = useState("");
	const [questionBody, setQuestionBody] = useState("");
	const [questionTags, setQuestionTags] = useState("");
	//
	const disptach = useDispatch();
	const navigate = useNavigate();
	const User = useSelector((state) => state.currentUserReducer);

	//
	const handleSubmit = (e) => {
		e.preventDefault();
		if (User === null) {
			alert("Please login or signup to answer a question..:)");
			navigate("/auth");
		} else {
			disptach(
				askQuestion(
					{
						questionTitle,
						questionBody,
						questionTags,
						userPosted: User.result.name,
						userId: User.result._id,
					},
					navigate
				)
			);
		}
	};
	const handleEnter = (e) => {
		if (e.key === "Enter") {
			setQuestionBody(questionBody + "\n");
		}
	};
	return (
		<div className="ask-question">
			<div className="ask-ques-container">
				<h1>Ask a public Question</h1>
				<form onSubmit={handleSubmit}>
					<div className="ask-form-container">
						<label htmlFor="ask-ques-title">
							<h4>Title</h4>
							<p>Tell the problem name first</p>
							<input
								type="text"
								name=""
								id="ask-ques-title"
								placeholder="eg: useHistory not working in react "
								onChange={(e) => {
									setQuestionTitle(e.target.value);
								}}
							/>
						</label>
						<label htmlFor="ask-ques-body">
							<h4>Body</h4>
							<p>
								Be speific and ask ques the way explain your problem to
								a doctor
							</p>
							<textarea
								type="textarea"
								name=""
								id="ask-ques-body"
								onChange={(e) => {
									setQuestionBody(e.target.value);
								}}
								onKeyPress={handleEnter}
							/>
						</label>
						<label htmlFor="ask-ques-tags">
							<h4>Tags</h4>
							<p>Add upto 5 tags ralated to your problem</p>
							<input
								type="text"
								name=""
								id="ask-ques-tags"
								placeholder="eg: React FrontEnd HTML CSS JavaScript"
								onChange={(e) => {
									setQuestionTags(e.target.value.split(" "));
								}}
							/>
						</label>
					</div>
					<input
						type="submit"
						value="Review your Question"
						className="review-btn"
					/>
				</form>
			</div>
		</div>
	);
};

export default AskQuestion;
