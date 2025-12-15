import axios from "axios";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchVedicVideos = async (query) => {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        q: query + " vedic maths",
        maxResults: 10,
        type: "video",
        key: YOUTUBE_API_KEY
      }
    }
  );

  // Filter only Vedic Maths related videos
  return response.data.items.filter(video =>
    video.snippet.title.toLowerCase().includes("vedic") ||
    video.snippet.description.toLowerCase().includes("vedic")
  );
};
