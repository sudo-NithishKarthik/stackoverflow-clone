import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
//
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../Avatar/Avatar";
// import Button from "../Button/Button";

import "./navbar.css";

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const User = useSelector((state) => state.currentUserReducer) || null;

	useEffect(() => {
		const token = User?.token;
		if (token) {
			const decodeToken = decode(token);
			if (decodeToken.exp * 1000 < new Date().getTime()) {
				handleLogout();
			}
		}
		const curUser = JSON.parse(localStorage.getItem("Profile"));
		dispatch(setCurrentUser(curUser));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const handleLogout = () => {
		dispatch({ type: "LOG_OUT" });
		navigate("/");
		dispatch(setCurrentUser(null));
	};
	return (
		<nav className="main-nav">
			<div className="navbar">
				<Link to="/" className="nav-btn nav-logo">
					<img src={logo} alt="/" />
				</Link>
				<Link to="/" className="nav-btn nav-item">
					About
				</Link>
				<Link to="/" className="nav-btn nav-item">
					Product
				</Link>
				<Link to="/" className="nav-btn nav-item">
					For Teams
				</Link>
				<form>
					<input type="text" placeholder="Search...."></input>
					<img
						src={search}
						alt="/search"
						width={18}
						className="search-icon"
					/>
				</form>
				{User === null && (
					<Link to="/auth" className="nav-links nav-item" id="signup">
						Sign up
					</Link>
				)}
				{User === null ? (
					<Link to="/auth" className="nav-links nav-item">
						Log In
					</Link>
				) : (
					<>
						<Link
							to={`/users/${User?.result?._id}`}
							style={{ color: "black", textDecoration: "none" }}
						>
							<Avatar
								backgroundColor="#009dff"
								px="10px"
								py="7px"
								borderRadius="50%"
								color="white"
							>
								{User.result.name.charAt(0).toUpperCase()}
							</Avatar>
						</Link>
						<button className="nav-links nav-item" onClick={handleLogout}>
							Log Out
						</button>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
