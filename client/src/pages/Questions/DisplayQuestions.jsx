import React from "react";
import LeftSidebar from "../../Compnents/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Compnents/RightSidebar/RightSidebar";
import QuestionDetails from "./QuestionDetails";

const DisplayQuestions = () => {
	return (
		<div className="home-container-1">
			<LeftSidebar />
			<div className="home-container-2">
				<QuestionDetails />
				<RightSidebar />
			</div>
		</div>
	);
};

export default DisplayQuestions;
