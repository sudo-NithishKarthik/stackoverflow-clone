import React, { useState } from "react";
import "./auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
	const [isSignup, setisSignup] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSwitch = () => {
		setisSignup(!isSignup);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSignup) {
			if (!name) {
				alert("Please provide name");
			} else if (!email) {
				alert("Please provide valid email");
			} else if (!password) {
				alert("Please provide strong password");
			} else {
				dispatch(signup({ name, email, password }, navigate));
			}
		} else {
			if (!email) {
				alert("Please provide valid email");
			} else if (!password) {
				alert("Please provide strong password");
			} else {
				dispatch(login({ email, password }, navigate));
			}
		}
	};
	return (
		<section className="auth-section">
			{isSignup && <AboutAuth />}
			<div className="auth-container-2">
				{!isSignup && (
					<img src={icon} alt="stackoverflow" className="login-logo" />
				)}
				<form onSubmit={handleSubmit}>
					{isSignup && (
						<label htmlFor="name">
							<h4>Display Name</h4>
							<input
								type="text"
								name="name"
								id="name"
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</label>
					)}
					<label htmlFor="email">
						<h4>Email</h4>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</label>
					<label htmlFor="password">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<h4>Password</h4>
							{!isSignup && (
								<h4
									style={{
										color: "#007ac6",
										fontSize: "12px",
										fontWeight: "400",
										marginTop: "10px",
										marginBottom: "5px",
									}}
								>
									Forget Password?
								</h4>
							)}
						</div>
						<input
							type="password"
							name="password"
							id="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						{isSignup && (
							<p style={{ color: "#666767", fontSize: "12px" }}>
								Password must contain atleast 8 characters, <br />
								including atleast 1 number
							</p>
						)}
					</label>

					{isSignup && (
						<label htmlFor="check">
							<input type="checkbox" id="check" />
							<p style={{ color: "#666767", fontSize: "12px" }}>
								Opt-in to receive occasional mails of
								<br /> product updates,user research investigations
							</p>
						</label>
					)}
					<button type="submit" className="auth-btn">
						{!isSignup ? "Login" : "Sigin"}
					</button>
					{isSignup && (
						<p style={{ color: "#666767", fontSize: "12px" }}>
							By clicking "Sign up", you agree to our <br />
							<span style={{ color: "#007ac6" }}>
								{" "}
								terms of service{" "}
							</span>
							,<span style={{ color: "#007ac6" }}> privacy policy</span>,
							<span style={{ color: "#007ac6" }}> cookie policy</span>
						</p>
					)}
				</form>
				<p
					style={{ color: "#666767", fontSize: "12px", marginTop: "10px" }}
				>
					{isSignup
						? "Already have an account?"
						: "Don't have an account?"}
					<button
						type="button"
						className="handle-switch-btn"
						onClick={handleSwitch}
					>
						{isSignup ? "Login" : "Signin"}
					</button>
				</p>
			</div>
		</section>
	);
};

export default Auth;
