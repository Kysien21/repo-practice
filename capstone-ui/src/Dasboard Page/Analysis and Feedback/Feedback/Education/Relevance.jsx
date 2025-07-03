import "../Feedback.css";

import { useEffect, useState } from "react";
import { useRelevanceFunction } from "./useRelevanceFunction";

import axios from "axios";

function Relevance({ speed = 10 }) {
  const [target, setTarget] = useState(0);

useEffect(() => {
  const relevance = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/skill-match");
      setTarget(response.data.score);
    } catch (error) {
      console.error("Failed to fetch skill match score:", error);
    }
  };

  relevance();
}, []);

  const { progress, getProgressColor } = useRelevanceFunction(target, speed);

  const radius = 44;
  const center = 60;
  const stroke = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <section>
      <div className="relevance-container">
        <h1>Relevance</h1>
        <div className="progress-relevance">
          <div className="relevance-circle">
            <svg
              width="120"
              height="120"
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            >
              <circle
                stroke="#ddd"
                strokeWidth={stroke}
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
              />
              <circle
                stroke={getProgressColor()}
                strokeWidth={stroke}
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.2s linear" }}
              />
            </svg>
            <div className="progress-num">{progress}%</div>
          </div>
        </div>
      </div>

      <div className="comment-relevance-container">
        <h1>Analytics</h1>
        <div className="relevance-comment" />
      </div>
    </section>
  );
}

export default Relevance;
