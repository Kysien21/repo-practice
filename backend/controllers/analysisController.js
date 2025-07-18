require('dotenv').config();
const Anthropic = require('anthropic');
const Result = require('../models/Result');
const Feedback = require('../models/Feedback');

// const anthropic = new Anthropic({
//     apiKey: process.env.ANTHROPIC_API_KEY,
// });

exports.analyzeResume = async(req, res) => {
    const { resumeText, jobDescription } = req.body;

    // ✅ Check kung naa bay resume ug job description
    if (!resumeText || !jobDescription) {
        return res.status(400).json({ message: "Both resume and job description are required." });
    }

    try {
        // Prompt para sa AI nga mo-analyze sa resume base sa job description
        // Gi-ingnan ang AI nga ayaw hilabti ang personal info
        const prompt = `
You are an advanced resume analysis AI.

Analyze the RESUME compared to the JOB DESCRIPTION. Focus ONLY on the professional sections:
- Skills
- Work Experience
- Education
- Grammar and consistency

⚠️ Do NOT modify or include personal information (name, address, contact, etc.) in the optimized version.

Return this JSON format:
{
  "overallScore": 85,
  "sectionScores": {
    "RelevanceToJob": 80,
    "Experience": 90,
    "Education": 70,
    "ConsistencyAccuracy": 85
  },
  "missingSkills": ["Docker", "Node.js"],
  "missingPhrases": ["cross-functional collaboration"],
  "feedback": {
    "relevanceToJob": { "skillMatch": 78, "keywordMatch": 80 },
    "experience": { "workHistory": 82, "workHistorySkillMatch": 75 },
    "education": { "qualification": 65, "relevance": 70 },
    "consistencyAccuracy": { "spellingGrammar": 88, "consistency": 90 }
  },
  "optimizedResume": "Rewritten version of the resume here, without changing personal info"
}

Resume:
"""${resumeText}"""

Job Description:
"""${jobDescription}"""
`;

        // Tawagon ang API
        // const response = await anthropic.messages.create({
        //     model: 'claude-3.5-sonnet-20240606',
        //     max_tokens: 1024,
        //     temperature: 0.7,
        //     messages: [{
        //         role: 'user',
        //         content: [{
        //             type: 'text',
        //             text: "Analyze the resume and job description as per the prompt.",
        //         }]
        //     }]
        // });
        const resultText = response.content[0].text;

        let analysis;
        try {
            // 📦 I-parse ang JSON response gikan sa AI
            analysis = JSON.parse(resultText);
        } catch (parseErr) {
            return res.status(500).json({
                message: "Failed to parse AI response",
                raw: resultText,
            });
        }

        // 📝 I-save ang resulta (summary) sa Result collection
        const result = await Result.create({
            userId: req.session.user._id,
            resumeText, // ✅ Original nga extracted text
            optimizedResume: analysis.optimizedResume, // ✅ Gi-optimize nga resume
            jobDescription,
            overallScore: analysis.overallScore,
            sectionScores: analysis.sectionScores,
            missingSkills: analysis.missingSkills,
            missingPhrases: analysis.missingPhrases,
            feedback: analysis.feedback,
            createdAt: new Date()
        });

        // 📊 I-save ang detailed feedback sa laing collection (Feedback)
        await Feedback.create({
            userId: req.session.user._id,
            relevanceToJob: analysis.feedback.relevanceToJob,
            experience: analysis.feedback.experience,
            education: analysis.feedback.education,
            consistencyAccuracy: analysis.feedback.consistencyAccuracy,
            createdAt: new Date()
        });

        // ✅ Ibalik sa frontend ang tanang result
        res.json({
            message: "✅ Resume analyzed successfully",
            ...analysis,
            resumeText // Para makita sa frontend ang original text
        });

    } catch (error) {
        console.error("❌ Error from OpenAI:", error.message || error);
        console.log("dili mo gana imo api waa ka")
        res.status(500).json({ message: "failed, Try Again Later", error });
    }
};