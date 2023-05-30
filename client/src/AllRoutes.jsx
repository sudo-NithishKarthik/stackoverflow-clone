import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DisplayQuestions from "./pages/Questions/DisplayQuestions";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";

const AllRoutes = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/auth" element={<Auth />} />
			<Route exact path="/questions" element={<Questions />} />
			<Route exact path="/askquestion" element={<AskQuestion />} />
			<Route exact path="/questions/:id" element={<DisplayQuestions />} />
			<Route exact path="/tags" element={<Tags />} />
			<Route exact path="/users" element={<Users />} />
			<Route exact path="/users/:id" element={<UserProfile />} />
		</Routes>
	);
};

export default AllRoutes;
