import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  plan: { type: String, default: 'free' },
  aiChatsUsed: { type: Number, default: 0 },
  premiumExpiry: Date
});

export default mongoose.model('User', userSchema);

