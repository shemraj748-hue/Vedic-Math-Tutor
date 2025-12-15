import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { API } from "../utils/api";

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/videos/vedic`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVideos(res.data);
    };
    loadVideos();
  }, []);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {videos.map((v, i) => (
        <VideoCard key={i} video={v} />
      ))}
    </div>
  );
}
