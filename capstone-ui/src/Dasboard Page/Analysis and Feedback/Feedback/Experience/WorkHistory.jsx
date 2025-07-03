import "../Feedback.css";

import { useEffect, useState } from "react";
import { useWorkHistoryFunction } from "./useWorkHistoryFunction";

import axios from "axios";


function WorkHistory({ speed = 10 }) {
  const [target, setTarget] = useState(0);

useEffect(() => {
  const workHistoryScore = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/skill-match");
      setTarget(response.data.score);
    } catch (error) {
      console.error("Failed to fetch skill match score:", error);
    }
  };

  workHistoryScore();
}, []);

  const { progress, getProgressColor } = useWorkHistoryFunction(target, speed);

  const radius = 44;
  const center = 60;
  const weight = 25;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <section>
      <div className="workhistory-container">
        <h1>Work History</h1>
        <div className="progress-workhistory">
          <div className="workhistory-circle">
            <svg
              width="120"
              height="120"
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            >
              <circle
                stroke="#ddd"
                strokeWidth={weight}
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
              />
              <circle
                stroke={getProgressColor()}
                strokeWidth={weight}
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.2s linear" }}
              />
            </svg>
            <div className="progress-num">{progress}%</div>
          </div>
        </div>
      </div>

      <div className="comment-workhistory-container">
        <h1>Analytics</h1>
        <div className="workhistory-comment" />
      </div>
    </section>
  );
}

export default WorkHistory;
