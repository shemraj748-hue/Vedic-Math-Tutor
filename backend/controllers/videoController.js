import { fetchVedicVideos } from "../config/youtube.js";

export const getVedicVideos = async (req, res) => {
  const user = req.user;

  if (user.plan === "free") {
    return res.status(403).json({
      msg: "Upgrade to premium to access Vedic Maths videos"
    });
  }

  const { topic } = req.query;

  try {
    const videos = await fetchVedicVideos(topic || "vedic maths");
    res.json(videos);
  } catch (error) {
    res.status(500).json({ msg: "Video fetch failed" });
  }
};
