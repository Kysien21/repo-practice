import "../Feedback.css";
import { useEffect, useState } from "react";
import { useSpellingAndGrammarFunction } from "./useSpellingAndGrammarFunction";
import axios from "axios";

function SpellingAndGrammar({ spellingGrammarSpeed = 10 }) {
  const [spellingGrammarScore, setSpellingGrammarScore] = useState(0);
  const [spellingGrammarFeedback, setSpellingGrammarFeedback] = useState("");

  useEffect(() => {
    const fetchSpellingGrammarScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/spellinggrammar-score");
        console.log("Fetched Spelling & Grammar score:", response.data.score);
        setSpellingGrammarScore(response.data.score);
      } catch (error) {
        console.error("Failed to fetch spelling & grammar score:", error);
      }
    };

    fetchSpellingGrammarScore();
  }, []);

  useEffect(() => {
    const fetchSpellingGrammarFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/spellinggrammar-feedback");
        setSpellingGrammarFeedback(response.data.comment || "No feedback provided.");
      } catch (error) {
        console.error("Failed to fetch spelling & grammar feedback:", error);
      }
    };

    fetchSpellingGrammarFeedback();
  }, []);

  const {
    spellingGrammarProgress,
    getSpellingGrammarProgressColor,
  } = useSpellingAndGrammarFunction(spellingGrammarScore, spellingGrammarSpeed);

  const radius = 44;
  const center = 60;
  const stroke = 25;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (spellingGrammarProgress / 100) * circumference;

  return (
    <section>
      <div className="spellinggrammar-container">
        <h1>Spelling & Grammar</h1>
        <div className="progress-spellinggrammar">
          <div className="spellinggrammar-circle">
            <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
              <circle stroke="#ddd" strokeWidth={stroke} fill="transparent" r={radius} cx={center} cy={center} />
              <circle
                stroke={getSpellingGrammarProgressColor()}
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
            <div className="progress-num">{spellingGrammarProgress}%</div>
          </div>
        </div>
      </div>
      <div className="comment-spellinggrammar-container">
        <h1>Analytics</h1>
        <div className="spellinggrammar-comment">
          <p>{spellingGrammarFeedback}</p>
        </div>
      </div>
    </section>
  );
}

export default SpellingAndGrammar;
