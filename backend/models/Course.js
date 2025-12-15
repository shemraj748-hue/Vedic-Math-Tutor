import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  premium: Boolean
});

export default mongoose.model("Course", courseSchema);
