import express from "express";
import { getVedicVideos } from "../controllers/videoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/vedic", protect, getVedicVideos);

export default router;
