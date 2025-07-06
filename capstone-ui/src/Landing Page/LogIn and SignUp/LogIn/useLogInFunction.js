import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useLogInFunction() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        if (!email.endsWith("@gmail.com")) {
            alert("Only @gmail.com emails are allowed.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/login", {
                email,
                password,
            }, {
                withCredentials: true, // ✅ ALLOW cookies (for session)
            });
            const { success, message } = response.data;

            if (success || message === "Login successful") {
                alert("Login successful");
                navigate("/upload");
            } else {
                alert(message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed.");
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        emailRef,
        passwordRef,
        handleLogin,
    };
}