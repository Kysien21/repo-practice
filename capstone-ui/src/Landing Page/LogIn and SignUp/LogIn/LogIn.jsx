  import "./Login.css";

  import LogoIcon from "../../../assets/Logo.png";
  import GoogleIcon from "../../../assets/google.png";
  import FacebookIcon from "../../../assets/facebook.png";
  
  import { useLogInFunction } from "./useLogInFunction";

  function Login() {
    const {
      email,
      setEmail,
      password,
      setPassword,
      emailRef,
      passwordRef,
      handleLogin,
    } = useLogInFunction();

    const handleKeyDown = (e, nextRef) => {
      if (e.key === "Enter") {
        e.preventDefault();
        nextRef?.current?.focus();
      }
    };

    return (
      <div className="login-container">
        <div className="login-content">
          <div className="login-left" />

          <div className="login-wrapper">
            <div className="login-logo">
              <img src={LogoIcon} alt="Next Page" />
              <div className="login-text">
                <h1>Welcome Back!</h1>
                <p>Sign in to access your dashboard.</p>
              </div>
            </div>

            <div className="login-box">
              <form onSubmit={handleLogin}>
                <label>
                  <h2>Email:</h2>
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleLogin(e);
                      }
                    }}
                  />
                </label>

                <div className="forgot-password">
                  <a href="#">Forgot Password?</a>
                </div>

                <button type="submit">Login</button>
              </form>

              <div className="login-bottom">
                <p>or login using</p>
              </div>

              <div className="google-facebook-icon">
                <img className="google-icon" src={GoogleIcon} alt="Google" />
                <img className="facebook-icon" src={FacebookIcon} alt="Facebook" />
              </div>

              <div className="signup">
                <p>Not yet registered?</p>
                <a href="#">Sign up now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Login;
