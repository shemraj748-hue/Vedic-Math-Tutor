import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'User not found' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ msg: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
};
 backend/controllers/aiController.js
import { askAI } from '../config/ai.js';

export const aiChat = async (req, res) => {
  const { question, language } = req.body;
  const user = req.user;

  if (user.plan === 'free' && user.aiChatsUsed >= 3) {
    return res.status(403).json({ msg: 'Free limit reached. Upgrade to Premium.' });
  }

  const answer = await askAI(question, language || 'English');
  user.aiChatsUsed += 1;
  await user.save();

  res.json({ answer, chatsUsed: user.aiChatsUsed });
};
