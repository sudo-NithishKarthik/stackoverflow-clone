import React from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../Compnents/Avatar/Avatar";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteAnswer } from "../../actions/question";

const DisplayAnswer = ({ question, handleShare, User }) => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const handleDelete = (answerId, noOfAnweres) => {
		dispatch(deleteAnswer(id, answerId, noOfAnweres - 1));
	};

	return (
		<>
			{question.answer.map((ans) => (
				<div className="display-ans" key={ans._id}>
					<p>{ans.answerBody} </p>
					<div className="question-actions-user">
						<div>
							<button type="button" onClick={handleShare}>
								Share
							</button>

							{User?.result?._id === ans?.userId && (
								<button
									type="button"
									onClick={() =>
										handleDelete(ans._id, question.noOfAnweres)
									}
								>
									Delete
								</button>
							)}
						</div>
						<div>
							<p>ans {moment(ans.answeredOn).fromNow()} </p>
							<Link
								to={`/users/${ans.userId}`}
								style={{ color: "#0086d6" }}
								className="user-link"
							>
								<Avatar backgroundColor="#f674fc" px="14px" py="7px">
									{ans.userAnswered &&
										ans.userAnswered.charAt(0).toUpperCase()}{" "}
								</Avatar>
								<div>{ans.userAnswered || "Unk"}</div>
							</Link>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default DisplayAnswer;
