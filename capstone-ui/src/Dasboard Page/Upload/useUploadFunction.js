import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useUploadFunction() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
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
    fileInputRef.current?.click();
  };

  const submitResumeUpload = async (e) => {
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
  const response = await axios.post("http://localhost:5000/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  const { success, message } = response.data;

  if (success || message === "Upload Successful") {
    alert("Upload Successful");
    navigate("/upload");
  } else {
    alert(message || "Upload Failed");
  }
} catch (error) {
  console.error("Upload Failed:", error);
  alert("Upload Failed, Server Error");
}
  };

  return {
    resumeFile,
    jobDescription,
    setJobDescription,
    resumeFileSelection,
    resumeFileUpload,
    submitResumeUpload,
    fileInputRef,
  };
}
