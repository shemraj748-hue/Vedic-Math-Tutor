// ================= BACKEND =================
// backend/config/ai.js
// Open‑source / self‑host ready (example using local LLM endpoint like Ollama)
import axios from 'axios';

export const askAI = async (prompt, language) => {
  const response = await axios.post('http://localhost:11434/api/generate', {
    model: 'llama3',
    prompt: `Explain this Vedic Maths doubt in ${language}: ${prompt}`,
    stream: false
  });
  return response.data.response;
};
// backend/routes/aiRoutes.js
import express from 'express';
import { aiChat } from '../controllers/aiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/chat', protect, aiChat);
export default router;