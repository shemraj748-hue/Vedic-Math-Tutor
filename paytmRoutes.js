import express from "express";
import { createOrder, paymentCallback } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.post("/callback", paymentCallback);

export default router;
