import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utils/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data);
    };
    load();
  }, []);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((c, i) => (
        <div key={i} className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-xl font-bold">{c.title}</h2>
          <p>{c.description}</p>
          {c.premium && <span className="text-red-500">Premium</span>}
        </div>
      ))}
    </div>
  );
}
