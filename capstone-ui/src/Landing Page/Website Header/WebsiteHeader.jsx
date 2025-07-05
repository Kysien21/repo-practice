import "./WebsiteHeader.css";

import Logo from "../../assets/Logo.png";

import LogIn from "../LogIn and SignUp/LogIn/LogIn";
import SignUp from "../LogIn and SignUp/SignUp/SignUp";

import { useWebsiteHeaderFunction } from "./useWebsiteHeaderFunction";

function WebsiteHeader() {
  const {
    login,
    signup,
    toggleLogin,
    toggleSignup,
    handleModalClose,
  } = useWebsiteHeaderFunction();

  let modalContent = null;
  if (login || signup) {
    modalContent = (
      <div className="modal-overlay" onClick={handleModalClose}>
        <div onClick={(e) => e.stopPropagation()}>
          {login && <LogIn />}
          {signup && <SignUp />}
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="website-header">
        <div className="logo">
          <img src={Logo} alt="Next Page" />
          <h1>Enhancify.ai</h1>
        </div>
        <nav className="website-navbar">
          <a href="#">How it Works</a>
          <a href="#">Pricing</a>
          <a href="#">Contact Us</a>
        </nav>
        <div className="form">
          <a href="#" onClick={toggleLogin}>Log In</a>
          <a href="#" onClick={toggleSignup}>Sign Up</a>
        </div>
      </header>

      {modalContent}
    </>
  );
}

export default WebsiteHeader;