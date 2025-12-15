import { useEffect, useRef } from "react";
import { fadeUp } from "../animations/gsap";

export default function Home() {
  const ref = useRef();

  useEffect(() => {
    fadeUp(ref.current);
  }, []);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center">
      <h1 className="text-5xl font-bold">Vedic Maths AI Tutor</h1>
    </div>
  );
}
