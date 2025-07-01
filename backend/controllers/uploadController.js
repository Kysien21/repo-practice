const fs = require('fs'); // ✅ FIXED
const path = require('path');
const pdfParse = require('pdf-parse');
const Result = require('../models/Result');

exports.uploadResume = async(req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not authenticated. Please login first.' });
    }

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    try {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        const resumeText = pdfData.text.toLowerCase();

        const jobDescription = (req.body.jobDescription || '').toLowerCase();
        const score = computeMatchScore(resumeText, jobDescription);

        const result = new Result({
            userId: req.session.user._id,
            score,
            jobDescription,
            createdAt: new Date(),
        });

        await result.save();

        res.status(200).json({
            message: '✅ Resume uploaded and analyzed',
            score,
            result,
            success: true
        });

    } catch (err) {
        console.error('❌ Error processing resume:', err);
        res.status(500).json({ message: 'Failed to process resume', error: err.message });
    }
};

function computeMatchScore(resumeText, jobDesc) {
    const resumeWords = resumeText.split(/\s+/);
    const descWords = jobDesc.split(/\s+/);
    const matchCount = descWords.filter(word => resumeWords.includes(word)).length;
    const score = Math.round((matchCount / descWords.length) * 100);
    return score || 0;
}