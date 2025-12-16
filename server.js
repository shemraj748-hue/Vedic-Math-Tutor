// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import videoRoutes from "./routes/videoRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import voiceRoutes from './routes/voiceRoutes.js';

app.use('/api/voice', voiceRoutes);


app.use("/api/courses", courseRoutes);

app.use("/api/payment", paymentRoutes);


app.use("/api/videos", videoRoutes);

app.use('/api/ai', aiRoutes);


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

