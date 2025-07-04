import "../Feedback.css";
import { useEffect, useState } from "react";
import { useQualificationFunction } from "./useQualificationFunction";
import axios from "axios";

function Qualification({ qualificationSpeed = 10 }) {
  const [qualificationScore, setQualificationScore] = useState(0);
  const [qualificationFeedback, setQualificationFeedback] = useState("");

  useEffect(() => {
    const fetchQualificationScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/qualification-score");
        console.log("Fetched Qualification score:", response.data.score);
        setQualificationScore(response.data.score);
      } catch (error) {
        console.error("Failed to fetch qualification score:", error);
      }
    };

    fetchQualificationScore();
  }, []);

  useEffect(() => {
    const fetchQualificationFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/qualification-feedback");
        setQualificationFeedback(response.data.comment || "No feedback provided.");
      } catch (error) {
        console.error("Failed to fetch qualification feedback:", error);
      }
    };

    fetchQualificationFeedback();
  }, []);

  const {
    qualificationProgress,
    getQualificationProgressColor,
  } = useQualificationFunction(qualificationScore, qualificationSpeed);

  const radius = 44;
  const center = 60;
  const stroke = 25;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (qualificationProgress / 100) * circumference;

  return (
    <section>
      <div className="qualification-container">
        <h1>Qualification</h1>
        <div className="progress-qualification">
          <div className="qualification-circle">
            <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
              <circle
                stroke="#ddd"
                strokeWidth={stroke}
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
              />
              <circle
                stroke={getQualificationProgressColor()}
                strokeWidth={stroke}
                fill="transparent"
                r={radius}
                cx={center}
                cy={center}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.2s linear" }}
              />
            </svg>
            <div className="progress-num">{qualificationProgress}%</div>
          </div>
        </div>
      </div>

      <div className="comment-qualification-container">
        <h1>Analytics</h1>
        <div className="qualification-comment">
          <p>{qualificationFeedback}</p>
        </div>
      </div>
    </section>
  );
}

export default Qualification;
