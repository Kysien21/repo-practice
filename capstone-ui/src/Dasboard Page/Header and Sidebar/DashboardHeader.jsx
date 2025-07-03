import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DashboardHeader.css";

import Logoicon from "../../assets/Logo.png";
import Profileicon from "../../assets/Profile.png";
import Tooltipicon from "../../assets/Tooltip.png";

function DashboardHeader() {
  const [showModal, setShowModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const modalRef = useRef(null);

  // Toggle dropdown
  const toggleModal = () => setShowModal(prev => !prev);

  // Toggle navbar for mobile
  const toggleNav = () => setNavOpen(prev => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-dashboard">
          <img className="logo-icon" src={Logoicon} alt="Enhancify.AI Logo" />
          <h1 className="logo-name">Enhancify.AI</h1>
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggle"
          onClick={toggleNav}
          aria-label="Toggle Navigation"
        >
          ☰
        </button>

        {/* Main Navigation */}
        <nav className={navOpen ? "dashboard-navbar open" : "dashboard-navbar"}>
          <Link to="#" className="nav-link">Home</Link>
          <Link to="#" className="nav-link">About</Link>
          <Link to="#" className="nav-link">Contacts</Link>
          
          <Link to="/upgrade">
            <button className="upgrade-button">Upgrade Plan</button>
          </Link>

          {/* Profile Menu */}
          <div className="dashboard-profile">
            <img className="profile-icon" src={Profileicon} alt="User Profile" />
            <img
              className="tooltip-icon"
              src={Tooltipicon}
              alt="Toggle Profile Menu"
              onClick={toggleModal}
              role="button"
              tabIndex={0}
            />

            {showModal && (
              <div className="small-modal show" ref={modalRef}>
                <ul className="modal-menu">
                  <li><Link to="/profile" className="modal-link" onClick={toggleModal}>Profile</Link></li>
                  <li><Link to="/settings" className="modal-link" onClick={toggleModal}>Settings</Link></li>
                  <li><Link to="/website" className="modal-link" onClick={toggleModal}>Logout</Link></li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeader;
