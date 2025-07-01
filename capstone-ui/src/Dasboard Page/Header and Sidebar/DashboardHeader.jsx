import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DashboardHeader.css";

import Logoicon from "../../assets/Logo.png";
import Profileicon from "../../assets/Profile.png";
import Tooltipicon from "../../assets/Tooltip.png";

function DashboardHeader() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => setShowModal(prev => !prev);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="header-container">

        <div className="logo-dashboard">
          <img className="logo-icon" src={Logoicon} alt="Enhancify.AI Logo" />
          <h1 className="logo-name">Enhancify.AI</h1>
        </div>

        <nav>
          <div className="dashboard-navbar">
            <Link to="#" className="nav-link">Home</Link>
            <Link to="#" className="nav-link">About</Link>
            <Link to="#" className="nav-link">Contacts</Link>

            <Link to="/upgrade">
              <button className="upgrade-button">Upgrade Plan</button>
            </Link>

            <div className="dashboard-profile" style={{ position: "relative" }}>
              <img className="profile-icon" src={Profileicon} alt="User Profile" />
              <img
                className="tooltip-icon"
                src={Tooltipicon}
                alt="Open Profile Menu"
                onClick={toggleModal}
                style={{ cursor: "pointer" }}
              />

              {showModal && (
                <div className="small-modal" ref={modalRef}>
                  <ul className="modal-menu">
                    <li>
                      <Link to="/profile" className="modal-link" onClick={toggleModal}>Profile</Link>
                    </li>
                    <li>
                      <Link to="/settings" className="modal-link" onClick={toggleModal}>Settings</Link>
                    </li>
                    <li>
                      <Link to="/website" className="modal-link" onClick={toggleModal}>Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeader;
