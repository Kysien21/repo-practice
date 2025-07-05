import "../Feedback.css";
import { useEffect, useState } from "react";
import { useWorkHistorySkillMatchFunction } from "./useWorkHistorySkillMatchFunction";
import axios from "axios";

function WorkHistorySkillMatch({ workHistorySkillMatchSpeed = 10 }) {
  const [workHistorySkillMatchScore, setWorkHistorySkillMatchScore] = useState(0);
  const [workHistorySkillMatchFeedback, setworkHistorySkillMatchFeedback] = useState("");

  useEffect(() => {
    const fetchWorkHistorySkillMatchScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/work-history-skill-match");
        console.log("Fetched work history skill match score:", response.data.score);
        setWorkHistorySkillMatchScore(response.data.score);
      } catch (error) {
        console.error("Failed to fetch work history skill match score:", error);
      }
    };

    fetchWorkHistorySkillMatchScore();
  }, []);

    useEffect(() => {
    const fetchWorkHistorySkillMatchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/work-history-skill-match-feedback");
        console.log("Fetched keyword skill match feedback:", response.data.comment);
        setworkHistorySkillMatchFeedback(response.data.comment || "No feedback provided.");
      } catch (error) {
        console.error("Failed to fetch keyword skill match feedback:", error);
      }
    };

    fetchWorkHistorySkillMatchFeedback();
  }, []);

  const {
    workHistorySkillMatchProgress,
    getWorkHistorySkillMatchProgressColor,
  } = useWorkHistorySkillMatchFunction(workHistorySkillMatchScore, workHistorySkillMatchSpeed);

  const radius = 44;
  const center = 60;
  const weight = 25;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (workHistorySkillMatchProgress / 100) * circumference;

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
                stroke={getWorkHistorySkillMatchProgressColor()}
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
            <div className="progress-num">{workHistorySkillMatchProgress}%</div>
          </div>
        </div>
      </div>

      <div className="comment-workhistoryskillmatch-container">
        <h1>Analytics</h1>
        <div className="workhistoryskillmatch-comment" />
        <p>{workHistorySkillMatchFeedback}</p>
      </div>
    </section>
  );
}

export default WorkHistorySkillMatch;
