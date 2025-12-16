export const speak = async (req, res) => {
  const user = req.user;
  if (user.plan !== 'premium') {
    return res.status(403).json({ msg: 'Voice AI is premium only' });
  }
  res.json({ allowed: true });
};

// backend/routes/voiceRoutes.js
import express from 'express';
import { speak } from '../controllers/voiceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/speak', protect, speak);
export default router;
