import { Link } from "react-router-dom";
import "./DashboardSidebar.css";

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
              <Link to="/upload" className="side-link">Upload</Link>
            </li>
            <li>
              <Link to="/analysis" className="side-link">Analysis & Feedback</Link>
            </li>
            <li>
              <Link to="/result" className="side-link">Result</Link>
            </li>
            <li>
              <Link to="/history" className="side-link">History</Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
