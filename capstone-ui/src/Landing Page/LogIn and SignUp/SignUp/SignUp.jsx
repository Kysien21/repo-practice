import "./SignUp.css";
import LogoIcon from "../../../assets/Logo.png";
import { useSignUpFunction } from "./useSignUpFunction";

function SignUp() {
  const {
    firstname, setFirstname,
    lastname, setLastname,
    mobile, setMobile,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    lastnameRef, mobileRef, emailRef, passwordRef, confirmPasswordRef,
    handleSignup,
  } = useSignUpFunction();

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-left" />

        <div className="signup-wrapper">
          <div className="signup-logo">
            <img src={LogoIcon} alt="Next Page" />
            <div className="signup-text">
              <h1>We're excited to have you<br />on board!</h1>
            </div>
          </div>

          <div className="signup-box">
            <form onSubmit={handleSignup}>
              <label>
                <h2>Firstname:</h2>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, lastnameRef)}
                />
              </label>

              <label>
                <h2>Lastname:</h2>
                <input
                  type="text"
                  ref={lastnameRef}
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, mobileRef)}
                />
              </label>

              <label>
                <h2>Mobile No:</h2>
                <input
                  type="text"
                  ref={mobileRef}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, emailRef)}
                />
              </label>

              <label>
                <h2>Email Address:</h2>
                <input
                  type="text"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                />
              </label>

              <label>
                <h2>Password:</h2>
                <input
                  type="password"
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
                />
              </label>

              <label>
                <h2>Confirm Password:</h2>
                <input
                  type="password"
                  ref={confirmPasswordRef}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignup(e);
                    }
                  }}
                />
              </label>

              <div className="terms">
                <a href="#">I agree to the Terms of Service and Privacy Policy</a>
              </div>

              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
