import { useEffect, useState } from "react";
import axios from "axios";
import "../Feedback.css";
import { useConsistencyFunction } from "./useConsistencyFunction";

function Consistency({ speed = 10 }) {
  const [target, setTarget] = useState(0);

useEffect(() => {
  const consistencyScore = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/skill-match");
      setTarget(response.data.score);
    } catch (error) {
      console.error("Failed to fetch skill match score:", error);
    }
  };

  consistencyScore();
}, []);

  const { progress, getProgressColor } = useConsistencyFunction(target, speed);

  const radius = 44;
  const center = 60;
  const stroke = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <section>
      <div className="consistency-container">
        <h1>Consistency</h1>
        <div className="progress-consistency">
          <div className="consistency-circle">
            <svg width="120" height="120" style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}>
              <circle stroke="#ddd" strokeWidth={stroke} fill="transparent" r={radius} cx={center} cy={center} />
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
      <div className="comment-consistency-container">
        <h1>Analytics</h1>
        <div className="consistency-comment" />
      </div>
    </section>
  );
}

export default Consistency;
