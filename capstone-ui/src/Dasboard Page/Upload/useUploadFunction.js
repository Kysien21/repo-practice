import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useUploadFunction() {
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [plainText, setPlainText] = useState("");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const resumeFileSelection = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size === 0) {
            alert("The selected file is empty. Please upload a valid resume.");
            e.target.value = null;
            return;
        }

        const allowedResumeFormats = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedResumeFormats.includes(file.type)) {
            alert("Invalid file type. Only PDF, DOC, or DOCX files are allowed.");
            e.target.value = null;
            return;
        }

        setResumeFile(file);
        e.target.value = null;
    };

    const resumeFileUpload = () => {
        fileInputRef.current.click();
    };

    const submitResumeUpload = async(e) => {
        e.preventDefault();

        if (!resumeFile) {
            alert("Please upload a resume file.");
            return false;
        }

        if (!jobDescription.trim()) {
            alert("Please enter a job description.");
            return false;
        }

        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("jobDescription", jobDescription);

        try {
            // ✅ 1. Upload file to backend
            const response = await axios.post("http://localhost:3000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            const { success, message, resumeText } = response.data;

            if (!success && message !== "Upload Successful") {
                alert(message || "Upload Failed");
                return false;
            }

            // ✅ 2. Analyze with OpenAI
            const analyzeRes = await axios.post("http://localhost:3000/api/analyze", {
                resumeText,
                jobDescription
            }, {
                withCredentials: true
            });

            const analysis = analyzeRes.data;

            // ✅ 3. Save
            setPlainText(resumeText);
            localStorage.setItem("resumeText", resumeText);
            localStorage.setItem("jobDescription", jobDescription);
            localStorage.setItem("overallScore", analysis.overallScore || 0);

            alert("Upload & AI analysis successful");
            navigate("/analysis");
            return true;
        } catch (error) {
            console.error("Upload Failed:", error);
            alert("Upload Failed, Server Error");
            return false;
        }
    };

    // ✅ Move this inside the function
    return {
        resumeFile,
        jobDescription,
        setJobDescription,
        resumeFileSelection,
        resumeFileUpload,
        submitResumeUpload,
        fileInputRef,
        plainText,
    };
}