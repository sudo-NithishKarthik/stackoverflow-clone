import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import users from "../models/auth.js";
dotenv.config();

export const signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const existinguser = await users.findOne({ email });
		if (existinguser) {
			return res.status(404).json({ message: "User already exits" });
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await users.create({
			name,
			email,
			password: hashedPassword,
		});
		const token = jwt.sign(
			{ email: newUser.email, id: newUser._id },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);
		res.status(200).json({ result: newUser, token });
	} catch (error) {
		res.status(500).json(error);
	}
};
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existinguser = await users.findOne({ email });
		if (!existinguser) {
			return res.status(404).json({ message: "User doesn't exits" });
		}

		const isPasswordCrt = bcrypt.compare(password, existinguser.password);
		if (!isPasswordCrt) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		const token = jwt.sign(
			{ email: existinguser.email, id: existinguser._id },
			"test",
			{
				expiresIn: "1h",
			}
		);
		res.status(200).json({ result: existinguser, token });
	} catch (error) {
		console.log("I am not albe to login...werrror");
		res.status(500).json(error);
	}
};
