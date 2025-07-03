import "../Feedback.css";

import { useEffect, useState } from "react";
import { useWorkHistorySkillMatchFunction } from "./useWorkHistorySkillMatchFunction";

import axios from "axios";

function WorkHistorySkillMatch({ speed = 10 }) {
  const [target, setTarget] = useState(0);

useEffect(() => {
  const WorkHistorySkillMatch = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/skill-match");
      setTarget(response.data.score);
    } catch (error) {
      console.error("Failed to fetch skill match score:", error);
    }
  };

  WorkHistorySkillMatch();
}, []);

  const { progress, getProgressColor } = useWorkHistorySkillMatchFunction(target, speed);

  const radius = 44;
  const center = 60;
  const weight = 25;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <section>
      <div className="workhistoryskillmatch-container">
        <h1>Work History Skill Match</h1>
        <div className="progress-workhistoryskillmatch">
          <div className="workhistoryskillmatch-circle">
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

      <div className="comment-workhistoryskillmatch-container">
        <h1>Analytics</h1>
        <div className="workhistoryskillmatch-comment" />
      </div>
    </section>
  );
}

export default WorkHistorySkillMatch;
