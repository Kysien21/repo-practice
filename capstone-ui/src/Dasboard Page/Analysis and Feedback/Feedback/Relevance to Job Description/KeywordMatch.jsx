import "../Feedback.css";
import { useEffect, useState } from "react";
import { useKeywordMatchFunction } from "./useKeywordMatchFunction";
import axios from "axios";

function KeywordMatch({ keywordMatchSpeed = 10 }) {
  const [keywordMatchScore, setKeywordMatchScore] = useState(0);
  const [keywordMatchFeedback, setKeywordMatchFeedback] = useState("");

  useEffect(() => {
    const fetchKeywordMatchScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/keyword-match-score");
        console.log("Fetched Keyword Match score:", response.data.score);
        setKeywordMatchScore(response.data.score);
      } catch (error) {
        console.error("Failed to fetch keyword match score:", error);
      }
    };

    fetchKeywordMatchScore();
  }, []);

  useEffect(() => {
    const fetchKeywordMatchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/keyword-match-feedback");
        console.log("Fetched keyword match feedback:", response.data.comment);
        setKeywordMatchFeedback(response.data.comment || "No feedback provided.");
      } catch (error) {
        console.error("Failed to fetch keyword match feedback:", error);
      }
    };

    fetchKeywordMatchFeedback();
  }, []);

  const { keywordMatchProgress, getKeywordProgressColor } = useKeywordMatchFunction(
    keywordMatchScore,
    keywordMatchSpeed
  );

  const radius = 44;
  const center = 60;
  const weight = 25;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (keywordMatchProgress / 100) * circumference;

  return (
    <section>
      <div className="keywordmatch-container">
        <h1>Keyword Match</h1>
        <div className="progress-keywordmatch">
          <div className="keywordmatch-circle">
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
                stroke={getKeywordProgressColor()}
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
            <div className="progress-num">{keywordMatchProgress}%</div>
          </div>
        </div>
      </div>

      <div className="comment-keywordmatch-container">
        <h1>Analytics</h1>
        <div className="keywordmatch-comment">
          <p>{keywordMatchFeedback}</p>
        </div>
      </div>
    </section>
  );
}

export default KeywordMatch;
