import DashboardHeader from "../../Header and Sidebar/DashboardHeader";
import DashboardSidebar from "../../Header and Sidebar/DashboardSidebar";
import "./Analysis.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAnalysisFunction } from "./useAnalysisFunction";
import axios from "axios";

function Analysis({ speed = 10 }) {
  const [target, setTarget] = useState(0);
  const { bluePercent, redPercent, showRed } = useAnalysisFunction(target, speed);

useEffect(() => {
  const fetchScore = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/score");
      setTarget(response.data.score);
    } catch (error) {
      console.error("Failed to fetch score:", error);
    }
  };

  fetchScore();
}, []);

  const radius = 115;
  const center = 165;
  const weight = 40;
  const fullCircle = 2 * Math.PI * radius;
  const blueLength = (bluePercent / 100) * fullCircle;
  const redLength = (redPercent / 100) * fullCircle;

  return (
    <main>
      <DashboardSidebar />
      <DashboardHeader />
      <section>
        <div className="analysis-container">
          <p>OVERALL SCORE</p>

          <div className="progress-analysis">
            <div className="analysis-circle">
              <svg
                width="325"
                height="335"
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
                  stroke="#3b7ce9"
                  strokeWidth={weight}
                  fill="transparent"
                  r={radius}
                  cx={center}
                  cy={center}
                  strokeDasharray={`${blueLength} ${fullCircle}`}
                  strokeDashoffset="0"
                  style={{ transition: "stroke-dasharray 0.2s linear" }}
                />
                {showRed && (
                  <circle
                    stroke="#e74c3c"
                    strokeWidth="40"
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                    strokeDasharray={`${redLength} ${fullCircle}`}
                    strokeDashoffset={-blueLength}
                    style={{ transition: "stroke-dasharray 0.2s linear" }}
                  />
                )}
              </svg>

              <div className="progress-text">
                <p>
                  You are <span className="analysis-percentage">{bluePercent}%</span> fit for your
                  <br />desired job
                </p>
              </div>
            </div>

            <div className="analysis-button">
              <Link to="/feedback">Proceed to Analytics</Link>
              <Link to="/upload">Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Analysis;
