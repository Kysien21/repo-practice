import "../Feedback.css";
import { useEffect, useState } from "react";
import { useConsistencyFunction } from "./useConsistencyFunction";
import axios from "axios";

function Consistency({ consistencySpeed = 10 }) {
  const [consistencyScore, setConsistencyScore] = useState(0);
  const [consistencyFeedback, setConsistencyFeedback] = useState("");

  useEffect(() => {
    const fetchConsistencyScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/consistency-score");
        console.log("Fetched Consistency score:", response.data.score);
        setConsistencyScore(response.data.score);
      } catch (error) {
        console.error("Failed to fetch consistency score:", error);
      }
    };

    fetchConsistencyScore();
  }, []);

  useEffect(() => {
    const fetchConsistencyFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/consistency-feedback");
        setConsistencyFeedback(response.data.comment || "No feedback provided.");
      } catch (error) {
        console.error("Failed to fetch consistency feedback:", error);
      }
    };

    fetchConsistencyFeedback();
  }, []);

  const {
    consistencyProgress,
    getConsistencyProgressColor,
  } = useConsistencyFunction(consistencyScore, consistencySpeed);

  const radius = 44;
  const center = 60;
  const stroke = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (consistencyProgress / 100) * circumference;

  return (
    <section>
      <div className="consistency-container">
        <h1>Consistency</h1>
        <div className="progress-consistency">
          <div className="consistency-circle">
            <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
              <circle stroke="#ddd" strokeWidth={stroke} fill="transparent" r={radius} cx={center} cy={center} />
              <circle
                stroke={getConsistencyProgressColor()}
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
            <div className="progress-num">{consistencyProgress}%</div>
          </div>
        </div>
      </div>
      <div className="comment-consistency-container">
        <h1>Analytics</h1>
        <div className="consistency-comment">
          <p>{consistencyFeedback}</p>
        </div>
      </div>
    </section>
  );
}

export default Consistency;
