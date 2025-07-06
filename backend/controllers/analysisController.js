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
You are an advanced resume analysis AI.

Given a RESUME and JOB DESCRIPTION, perform the following tasks:

1. Analyze the match between resume and job description.
2. Return structured feedback:
   - overallScore (0-100)
   - sectionScores: { Skills, Experience, Education }
   - missingSkills: list of specific skills missing
   - missingPhrases: important phrases or responsibilities not mentioned
   - feedback: constructive suggestions for improvement
   - optimizedResume: a rewritten, improved version of the resume

Respond only in **valid JSON** like this:
{
  "overallScore": 86,
  "sectionScores": {
    "Skills": 80,
    "Experience": 90,
    "Education": 70
  },
  "missingSkills": ["Docker", "Node.js"],
  "missingPhrases": ["collaborated with cross-functional teams"],
  "feedback": ["Add more relevant experience", "Highlight leadership in tech projects"],
  "optimizedResume": "Optimized resume text here..."
}

Resume:
"""${resumeText}"""

Job Description:
"""${jobDescription}"""
`;




        const completion = await openai.chat.completions.create({
            model: "gpt-4",
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

        await Result.create({
            userId: req.session.user._id,
            optimizedResume: analysis.optimizedResume, // ✅ Save optimized version
            jobDescription,
            overallScore: analysis.overallScore,
            sectionScores: analysis.sectionScores,
            feedback: analysis.feedback,
            missingSkills: analysis.missingSkills,
            missingPhrases: analysis.missingPhrases,
            createdAt: new Date()
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