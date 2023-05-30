import React from "react";
import HomeMainbar from "../../Compnents/HomeMainbar/HomeMainbar";
import LeftSidebar from "../../Compnents/LeftSidebar/LeftSidebar";
import RightSidebar from "../../Compnents/RightSidebar/RightSidebar";
import "../../App.css";

const Home = () => {
	return (
		<div className="home-container-1">
			<LeftSidebar />
			<div className="home-container-2">
				<HomeMainbar />
				<RightSidebar />
			</div>
		</div>
	);
};

export default Home;
