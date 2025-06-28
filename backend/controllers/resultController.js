const fs = require('fs');
const path = require('path');
const Result = require('../models/Result');
const Resume = require('../models/Resume');

// GET: List all results for the logged-in user
exports.getresults = async(req, res) => {
    try {
        const results = await Result.find({ userId: req.session.user._id }); // use session
        res.json({ message: "Results retrieved", results });
    } catch (err) {
        console.error('Error getting results:', err);
        res.status(500).json({ message: "Failed to get results" });
    }
};


exports.confirmAndDeleteOriginal = async(req, res) => {
    const { resumeId } = req.body;

    try {
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        const filePath = path.join(__dirname, '..', resume.originalFile);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }


        resume.originalFile = null;
        await resume.save();

        res.json({ message: '✅ Original resume deleted after confirmation' });
    } catch (err) {
        console.error('Error deleting resume:', err);
        res.status(500).json({ message: '❌ Failed to delete original resume' });
    }
};