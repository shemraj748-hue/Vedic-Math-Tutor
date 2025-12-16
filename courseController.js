import Course from "../models/Course.js";

export const getCourses = async (req, res) => {
  const user = req.user;
  const courses = await Course.find();

  if (user.plan !== "premium") {
    return res.json(courses.filter(c => !c.premium));
  }

  res.json(courses);
};
