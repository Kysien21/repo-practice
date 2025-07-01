import DashboardHeader from "../Header and Sidebar/DashboardHeader";
import DashboardSidebar from "../Header and Sidebar/DashboardSidebar";
import "./Result.css";
import RightArrowIcon from "../../assets/right arrow.png";
import DownloadIcon from "../../assets/Download.png";

function Result() {
  return (
    <main>
      <DashboardSidebar />
      <DashboardHeader />

      <section>
        <div className="result-container">
          <div className="result-text">
            <h1>Original</h1>
            <h1>Resume Optimize</h1>
          </div>

          <div className="uploaded-and-result">
            <div className="uploaded" />
            <img
              className="right-arrow-icon"
              src={RightArrowIcon}
              alt="Next Page"
            />
            <div className="result" />
          </div>

          <button className="download-button">
            <img
              src={DownloadIcon}
              alt="Download"
              className="download-icon"
            />
            <span>Download</span>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Result;
