import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../Compnents/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
	deleteQuestion,
	postAnswer,
	voteQuestion,
} from "../../actions/question.js";
// import copy from "copy-to-clipboard";

const QuestionDetails = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { id } = useParams();
	const url = "http://localhost:3000";
	const questionsList = useSelector((state) => state.questionReducer);

	const [Answer, setAnswer] = useState("Start typing here");
	const User = useSelector((state) => state.currentUserReducer);

	const handlePostAnswer = (e, answerLength) => {
		e.preventDefault();

		if (User === null) {
			alert("Please login or signup to answer a question..:)");
			navigate("/auth");
		} else {
			if (Answer.length < 10) {
				alert("Answer size is very small");
			} else {
				dispatch(
					postAnswer({
						id,
						noOfAnweres: answerLength,
						answerBody: Answer,
						userAnswered: User.result.name,
						userId: User.result._id,
					})
				);
			}
		}
	};
	const handleShare = () => {
		alert("Copied url ->:" + url + location.pathname);
	};
	const handleDelete = () => {
		dispatch(deleteQuestion(id, navigate));
	};
	const handleDownVote = () => {
		dispatch(voteQuestion(id, "downVote", User.result._id));
	};
	const handleUpVote = () => {
		dispatch(voteQuestion(id, "upVote", User.result._id));
	};
	return (
		<div className="question-details-page">
			{questionsList.data === null ? (
				<h1>Loading</h1>
			) : (
				<>
					{questionsList.data
						.filter((que) => que._id === id)
						.map((que) => (
							<div className="main" key={que._id}>
								<section className="question-details-container">
									<h1>{que.questionTitle}</h1>
									<div className="question-details-container-2">
										<div className="question-votes">
											<img
												src={upvote}
												alt="upvote"
												width={18}
												className="votes-icon"
												onClick={handleUpVote}
											/>
											<p>
												{que.upVote.length - que.downVote.length}{" "}
											</p>
											<img
												src={downvote}
												alt="downvote"
												width={18}
												className="votes-icon"
												onClick={handleDownVote}
											/>
										</div>
										<div style={{ width: "100%" }}>
											<p className="question-body">
												{que.questionBody}{" "}
											</p>
											<div className="question-details-tags">
												{que.questionTags.map((tag) => (
													<p key={tag}>{tag}</p>
												))}
											</div>
											<div className="question-actions-user">
												<div>
													<button
														type="button"
														onClick={handleShare}
													>
														Share
													</button>
													{User?.result?._id === que?.userId && (
														<button
															type="button"
															onClick={handleDelete}
														>
															Delete
														</button>
													)}
												</div>
												<div>
													<p>
														{" "}
														asked {moment(
															que.askedOn
														).fromNow()}{" "}
														by "{que.userPosted}"{" "}
													</p>
													<Link
														to={`/users/${que.userId}`}
														style={{ color: "#0086d6" }}
														className="user-link"
													>
														<Avatar
															backgroundColor="#f5d442"
															px="10px"
															py="7px"
														>
															{que.userPosted
																.charAt(0)
																.toUpperCase()}{" "}
														</Avatar>
														<div>{que.userPosted}</div>
													</Link>
												</div>
											</div>
										</div>
									</div>
								</section>
								{que.noOfAnweres !== 0 && (
									<section>
										<h3>{que.noOfAnweres} Answers</h3>
										<DisplayAnswer
											key={que._id}
											question={que}
											handleShare={handleShare}
											handleDelete={handleDelete}
											User={User}
										/>
									</section>
								)}
								<section className="post-ans-container">
									<h3>Your Answer</h3>
									<form
										onSubmit={(e) => {
											handlePostAnswer(e, que.answer.length + 1);
										}}
									>
										<textarea
											name=""
											id=""
											cols="30"
											rows="10"
											onChange={(e) => setAnswer(e.target.value)}
										></textarea>
										<input
											type="Submit"
											className="post-ans-btn"
											value="Post Answer"
										/>
									</form>
									<p>
										Browse other questions tagged
										{que.questionTags.map((tag) => (
											<Link
												to="/tags"
												key={tag}
												className="ans-tags"
											>
												{tag}{" "}
											</Link>
										))}{" "}
										or{" "}
										{
											<Link
												to="/askquestion"
												style={{
													color: "#009dff",
													textDecoration: "none",
												}}
											>
												ask your question
											</Link>
										}
									</p>
								</section>
							</div>
						))}
				</>
			)}
		</div>
	);
};

export default QuestionDetails;
