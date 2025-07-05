import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useWebsiteHeaderFunction() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const handledRedirect = useRef(false);

  const toggleLogin = () => {
    setLogin(true);
    setSignup(false);
  };

  const toggleSignup = () => {
    setSignup(true);
    setLogin(false);
  };

  const handleModalClose = () => {
    setLogin(false);
    setSignup(false);
  };

  useEffect(() => {
    if (location.state?.showLogin && !handledRedirect.current) {
      handledRedirect.current = true;
      setLogin(true);
      setSignup(false);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return {
    login,
    signup,
    toggleLogin,
    toggleSignup,
    handleModalClose,
  };
}