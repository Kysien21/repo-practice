import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useSignUpFunction() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const lastnameRef = useRef();
  const mobileRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !mobile || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

// Check if mobile contains only digits and is 10–15 characters long
if (!mobile || mobile.length < 11 || mobile.length > 15 || !/^\d+$/.test(mobile)) {
  alert("Mobile number must be 11 to 15 digits and contain only numbers.");
  return;
}

// Check if email ends with "@gmail.com" and has at least one character before it
if (!email.includes("@gmail.com") || email.indexOf("@gmail.com") === 0) {
  alert("Please enter a valid Gmail address.");
  return;
}


    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

try {
  const response = await axios.post("http://localhost:5000/api/signup", {
    First_name: firstname,
    Last_name: lastname,
    Mobile_No: mobile,
    Email_Address: email,
    Password: password,
    Confirm_Password: confirmPassword,
  });

  const { message } = response.data;

  if (message) {
    alert(message);
    navigate("/", { state: { showLogin: true } });
  }
} catch (error) {
  console.error("Signup Failed.", error);
  alert(error.response?.data?.message || "Signup Failed. Try again");
}
  };

  return {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    mobile,
    setMobile,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    lastnameRef,
    mobileRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    handleSignup,
  };
}
