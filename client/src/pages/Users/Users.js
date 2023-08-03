import React from "react";
import "../../App.css";
//
import LeftSidebar from "../../Compnents/LeftSidebar/LeftSidebar";
import "./Users.css";
import UsersList from "./UsersList";

const Users = ({ slideIn, handleSlideIn }) => {
	return (
		<div className="home-container-1">
			<LeftSidebar />
			<div className="home-container-2">
				<h1 className="tags-h1">Users</h1>
				<UsersList />
			</div>
		</div>
	);
};

export default Users;
