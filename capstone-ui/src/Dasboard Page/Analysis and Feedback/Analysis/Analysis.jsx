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
    const analysisScore = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/score");
        const score = response.data.score;
        setTarget(0);
        setTimeout(() => {
          setTarget(score);
        }, 200);
      } catch (error) {
        console.error("Failed to fetch score:", error);
      }
    };

    analysisScore();
  }, []);

  const radius = 115;
  const center = 165;
  const weight = 40;
  const fullCircle = 2 * Math.PI * radius;
  const blueOffset = (1 - bluePercent / 100) * fullCircle;
  const redOffset = (1 - (bluePercent + redPercent) / 100) * fullCircle;

  return (
    <main>
      <DashboardHeader />
      <DashboardSidebar />

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

                {showRed && (
                  <circle
                    stroke="#e74c3c"
                    strokeWidth={weight}
                    fill="transparent"
                    r={radius}
                    cx={center}
                    cy={center}
                    strokeDasharray={fullCircle}
                    strokeDashoffset={redOffset}
                    style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
                  />
                )}

                <circle
                  stroke="#3b7ce9"
                  strokeWidth={weight}
                  fill="transparent"
                  r={radius}
                  cx={center}
                  cy={center}
                  strokeDasharray={fullCircle}
                  strokeDashoffset={blueOffset}
                  style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
                />
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
