import "./DashboardSidebar.css";

import UploadIcon from "../../assets/Upload.png";
import AnalyticsIcon from "../../assets/Analysis & Feedback.png";
import ResultIcon from "../../assets/Result.png";
import { Link } from "react-router-dom";

function DashboardSidebar() {
  return (
    <aside>
      <div className="sidebar-container">
        <div className="dashboard-title">
          <h2>My Dashboard</h2>
        </div>
        <nav>
          <ul className="dashboard-sidebar">
            <li>
              <Link to="/upload" className="side-link">
                <img src={UploadIcon} alt="Upload" className="icon" />
                Upload
              </Link>
            </li>
            <li>
              <Link to="/analysis" className="side-link">
                <img src={AnalyticsIcon} alt="Analysis" className="icon" />
                Analysis & Feedback
              </Link>
            </li>
            <li>
              <Link to="/result" className="side-link">
                <img src={ResultIcon} alt="Result" className="icon" />
                Result
              </Link>
            </li>
            <li>
              <Link to="/history" className="side-link">
                <img src={ResultIcon} alt="History" className="icon" />
                History
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
