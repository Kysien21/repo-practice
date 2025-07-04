import "../Feedback.css";
import { useEffect, useState } from "react";
import { useWorkHistoryFunction } from "./useWorkHistoryFunction";
import axios from "axios";

function WorkHistory({ workHistorySpeed = 10 }) {
  const [workHistoryScore, setWorkHistoryScore] = useState(0);
  const [workHistoryFeedback, setWorkHistoryFeedback] = useState("");

  useEffect(() => {
    const fetchWorkHistoryScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/work-history-score");
        console.log("Fetched Work History score:", response.data.score);
        setWorkHistoryScore(response.data.score);
      } catch (error) {
        console.error("Failed to fetch work history score:", error);
      }
    };

    fetchWorkHistoryScore();
  }, []);

  useEffect(() => {
    const fetchWorkHistoryFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/work-history-feedback");
        console.log("Fetched work history feedback:", response.data.comment);
        setWorkHistoryFeedback(response.data.comment || "No feedback provided.");
      } catch (error) {
        console.error("Failed to fetch work history feedback:", error);
      }
    };

    fetchWorkHistoryFeedback();
  }, []);

  const { workHistoryProgress, getWorkHistoryProgressColor } =
    useWorkHistoryFunction(workHistoryScore, workHistorySpeed);

  const radius = 44;
  const center = 60;
  const weight = 25;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (workHistoryProgress / 100) * circumference;

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
                stroke={getWorkHistoryProgressColor()}
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
            <div className="progress-num">{workHistoryProgress}%</div>
          </div>
        </div>
      </div>

      <div className="comment-workhistory-container">
        <h1>Analytics</h1>
        <div className="workhistory-comment">
          <p>{workHistoryFeedback}</p>
        </div>
      </div>
    </section>
  );
}

export default WorkHistory;
