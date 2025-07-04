import "../Feedback.css";
import { useEffect, useState } from "react";
import { useRelevanceFunction } from "./useRelevanceFunction";
import axios from "axios";

function Relevance({ relevanceSpeed = 10 }) {
  const [relevanceScore, setRelevanceScore] = useState(0);
  const [relevanceFeedback, setRelevanceFeedback] = useState("");

  useEffect(() => {
    const fetchRelevanceScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/relevance-score");
        console.log("Fetched Relevance score:", response.data.score);
        setRelevanceScore(response.data.score);
      } catch (error) {
        console.error("Failed to fetch relevance score:", error);
      }
    };

    fetchRelevanceScore();
  }, []);

  useEffect(() => {
    const fetchRelevanceFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/relevance-feedback");
        setRelevanceFeedback(response.data.comment || "No feedback provided.");
      } catch (error) {
        console.error("Failed to fetch relevance feedback:", error);
      }
    };

    fetchRelevanceFeedback();
  }, []);

  const {
    relevanceProgress,
    getRelevanceProgressColor,
  } = useRelevanceFunction(relevanceScore, relevanceSpeed);

  const radius = 44;
  const center = 60;
  const stroke = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (relevanceProgress / 100) * circumference;

  return (
    <section>
      <div className="relevance-container">
        <h1>Relevance</h1>
        <div className="progress-relevance">
          <div className="relevance-circle">
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
                stroke={getRelevanceProgressColor()}
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
            <div className="progress-num">{relevanceProgress}%</div>
          </div>
        </div>
      </div>

      <div className="comment-relevance-container">
        <h1>Analytics</h1>
        <div className="relevance-comment">
          <p>{relevanceFeedback}</p>
        </div>
      </div>
    </section>
  );
}

export default Relevance;
