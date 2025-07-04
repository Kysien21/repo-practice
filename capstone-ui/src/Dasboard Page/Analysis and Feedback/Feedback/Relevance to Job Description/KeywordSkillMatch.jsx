import "../Feedback.css";
import { useEffect, useState } from "react";
import { useKeywordSkillMatchFunction } from "./useKeywordSkillMatchFunction";
import axios from "axios";

function KeywordSkillMatch({ keywordSkillMatchSpeed = 10 }) {
  const [keywordSkillMatchScore, setKeywordSkillMatchScore] = useState(0);
  const [keywordSkillMatchFeedback, setKeywordSkillMatchFeedback] = useState("");

  useEffect(() => {
    const fetchKeywordSkillMatchScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/keyword-skill-match-score");
        console.log("Fetched Keyword Skill Match score:", response.data.score);
        setKeywordSkillMatchScore(response.data.score);
      } catch (error) {
        console.error("Failed to fetch keyword skill match score:", error);
      }
    };

    fetchKeywordSkillMatchScore();
  }, []);

  useEffect(() => {
    const fetchKeywordSkillMatchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/keyword-skill-match-feedback");
        console.log("Fetched keyword skill match feedback:", response.data.comment);
        setKeywordSkillMatchFeedback(response.data.comment || "No feedback provided.");
      } catch (error) {
        console.error("Failed to fetch keyword skill match feedback:", error);
      }
    };

    fetchKeywordSkillMatchFeedback();
  }, []);

  const {
    keywordSkillMatchProgress,
    getKeywordSkillMatchProgressColor,
  } = useKeywordSkillMatchFunction(keywordSkillMatchScore, keywordSkillMatchSpeed);

  const radius = 44;
  const center = 60;
  const weight = 25;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (keywordSkillMatchProgress / 100) * circumference;

  return (
    <section>
      <div className="keywordskillmatch-container">
        <h1>Skill Match</h1>

        <div className="progress-keywordskillmatch">
          <div className="keywordskillmatch-circle">
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
                stroke={getKeywordSkillMatchProgressColor()}
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

            <div className="progress-num">{keywordSkillMatchProgress}%</div>
          </div>
        </div>
      </div>

      <div className="comment-keywordskillmatch-container">
        <h1>Analytics</h1>
        <div className="keywordskillmatch-comment">
          <p>{keywordSkillMatchFeedback}</p>
        </div>
      </div>
    </section>
  );
}

export default KeywordSkillMatch;
