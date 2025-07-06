require('dotenv').config();
const OpenAI = require('openai');
const Result = require('../models/Result'); // ✅ import model

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.analyzeResume = async(req, res) => {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
        return res.status(400).json({ message: "Both resume and job description are required." });
    }

    try {
        const prompt = `
You are an AI resume analyzer. Compare the resume to the job description.

Return this as JSON:
{
  "overallScore": number (0-100),
  "sectionScores": {
    "Skills": number,
    "Experience": number,
    "Education": number
  },
  "missingSkills": [ "string", "string", ... ],
  "missingPhrases": [ "string", "string", ... ],
  "feedback": [ "string", "string", ... ]
}

Only return valid JSON.

Resume:
"""${resumeText}"""

Job Description:
"""${jobDescription}"""
`;



        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        const resultText = completion.choices[0].message.content;

        let analysis;
        try {
            analysis = JSON.parse(resultText);
        } catch (parseErr) {
            return res.status(500).json({
                message: "Failed to parse AI response",
                raw: resultText,
            });
        }

        // ✅ Save result to MongoDB
        await Result.create({
            userId: req.session.user._id,
            resumeText,
            jobDescription,
            overallScore: analysis.overallScore,
            sectionScores: analysis.sectionScores,
            feedback: analysis.feedback,
        });

        res.json({
            message: "✅ Resume analyzed successfully",
            ...analysis,
        });

    } catch (error) {
        console.error("❌ Error from OpenAI:", error.message || error);
        res.status(500).json({ message: "AI analysis failed", error });
    }
};