import express from "express";
import { getCourses } from "../controllers/courseController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", protect, getCourses);
export default router;
