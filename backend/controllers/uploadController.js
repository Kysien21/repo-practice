const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

exports.uploadResume = async(req, res) => {
    try {
        const file = req.file;
        const jobDescription = req.body.jobDescription;

        if (!file || !jobDescription) {
            return res.status(400).json({ success: false, message: "Missing file or job description." });
        }

        let resumeText = "";

        // Handle PDF
        if (file.mimetype === "application/pdf") {
            const dataBuffer = fs.readFileSync(file.path);
            const data = await pdfParse(dataBuffer);
            resumeText = data.text;
        }

        // Handle DOCX
        else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const result = await mammoth.extractRawText({ path: file.path });
            resumeText = result.value;
        }

        // Handle unsupported formats
        else if (file.mimetype === "application/msword") {
            return res.status(400).json({ success: false, message: "DOC format not supported. Use PDF or DOCX." });
        }

        // Delete file after extraction
        fs.unlinkSync(file.path);

        // Return extracted text to frontend
        res.status(200).json({
            success: true,
            message: "Upload Successful",
            resumeText,
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during file upload.",
        });
    }
};