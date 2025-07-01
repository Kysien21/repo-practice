  import "./Upload.css";
  import { useUploadFunction } from "./useUploadFunction";
  import { useNavigate } from "react-router-dom";

  function UploadUI() {
    const {
      resumeFile,
      jobDescription,
      resumeFileSelection ,
      resumeFileUpload,
      submitResumeUpload,
      setJobDescription,
      fileInputRef,
    } = useUploadFunction();

    const navigate = useNavigate();

    const enhancifyClick = async (e) => {
      const isAccepted = await submitResumeUpload(e);
      if (isAccepted) {
        navigate("/analysis");
      }
    };

    return (
      <section>
        <div className="upload-container">
          <h1>Hello</h1>
          <h1>Ready to boost your Resume</h1>

          <form onSubmit={enhancifyClick}>
            <h5>Upload Resume</h5>
            <div className="upload-input" onClick={resumeFileUpload}>
              <input
                type="file"
                ref={fileInputRef}
                id="fileInput"
                accept="application/pdf"
                hidden
                onChange={resumeFileSelection}
              />
              <p>
                {resumeFile
                  ? resumeFile.name
                  : "Drag and Drop your Resume file"}
              </p>
            </div>

            <h5>Attach Job Description</h5>
            <div className="description-input">
              <input
                type="text"
                placeholder="Enter your Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <button className="upload-button" type="submit">
              Enhancify
            </button>
          </form>

          <div className="upload-bottom-text">
            <p>
              Please note that AI can make mistakes. We recommend verifying the
              information provided.
            </p>
          </div>
        </div>
      </section>
    );
  }

  export default UploadUI;
