import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
const instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_SECRET,
});

export const paymentOrder = async (req, res) => {
	try {
		// const options = JSON.parse(req.body);
		const subType = req.query.subType;
		console.log("subType : ", subType);
		const options = {
			amount: subType === "silver" ? 10000 : 50000, // amount in smallest currency unit
			currency: "INR",
			receipt: "receipt_order_74394",
		};
		const order = await instance.orders.create(options);
		if (!order) return res.status(500).send("Some error occured");
		console.log(order);
		res.status(200).json(order);
	} catch (error) {
		res.status(500).send(error);
	}
};

export const paymentStatus = async (req, res) => {
	try {
		const paymentId = req.body.razorpay_payment_id;
		const paymentResult = await instance.payments.fetch(paymentId);
		// console.log(paymentResult.captured);
		if (paymentResult.captured) {
		}
	} catch (error) {
		console.log(error);
	}
};
