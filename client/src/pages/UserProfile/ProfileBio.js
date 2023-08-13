import React, { useEffect } from "react";
import Button from "../../Compnents/Button/Button.jsx";
import axios from "axios";
import { paymentRequest, paymentStatus } from "../../api/index.js";
import useRazorpay from "react-razorpay";
import { json } from "react-router-dom";

const ProfileBio = ({ currentProfile }) => {
	console.log(currentProfile?._id);

	// const status = paymentStatus({ id: currentProfile?._id });
	const [Razorpay] = useRazorpay();

	const handlePayment = async (subType) => {
		const order = await paymentRequest(subType); //  Create order on your backend
		console.log("order", order);
		const { amount, id: order_id, currency } = order?.data;
		const options = {
			key: "rzp_test_n00MnGnrponGQR", // Enter the Key ID generated from the Dashboard
			amount: amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency: currency,
			name: "Acme Corp",
			description: "Test Transaction",
			order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
			handler: function(response) {
				// alert(response.razorpay_payment_id);
				// alert(response.razorpay_order_id);
				// const resData = json(
				// 	response,
				// 	id: currentProfile?._id,
				// );
				const status = paymentStatus({ ...response, id: currentProfile?._id });
				// alert(response.razorpay_signature);
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#3399cc",
			},
		};

		const rzp1 = new Razorpay(options);

		rzp1.on("payment.failed", function(response) {
			alert(response.error.code);
			alert(response.error.description);
			alert(response.error.source);
			alert(response.error.step);
			alert(response.error.reason);
			alert(response.error.metadata.order_id);
			alert(response.error.metadata.payment_id);
		});

		rzp1.open();
	};
	return (
		<div className="current-user-profile-main">
			<div className="user-tags">
				{currentProfile?.tags.length !== 0 ? (
					<>
						<h4>Tags watched</h4>
						{currentProfile?.tags.map((tag) => (
							<p key={tag} className="user-all-tags">
								{tag}
							</p>
						))}
					</>
				) : (
					<p>0 tags watched</p>
				)}
			</div>
			<div className="user-about">
				{currentProfile?.about ? (
					<>
						<h4>About</h4>
						<p className="user-about-para">{currentProfile?.about}</p>
					</>
				) : (
					<p>No bio found</p>
				)}
			</div>
			<div>Subscription Status: {currentProfile?.subscriptionStatus}</div>
			{/* <form onSubmit={ShowGateway}> */}
			{/* 	<script src="https://checkout.razorpay.com/v1/payment-button.js" async> */}
			{/* 		{" "} */}
			{/* 	</script>{" "} */}
			{/* </form> */}

			<button onClick={() => handlePayment("silver")}>upgrade to silver</button>
			<button onClick={() => handlePayment("gold")}>upgrade to gold</button>
		</div>
	);
};

export default ProfileBio;
