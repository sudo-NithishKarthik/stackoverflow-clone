import express from "express";
import { paymentOrder, paymentStatus } from "../controllers/payment.js";
import auth from "../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/orders/:subType", paymentOrder);
paymentRouter.post("/status", paymentStatus);

export default paymentRouter;
