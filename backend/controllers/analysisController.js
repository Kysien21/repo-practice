const natural = require('natural');

exports.analyzeResume = (req, res) => {
    const { resumeText, jobDescription } = req.body;

    //nlp
    const tokenizer = new natural.WordTokenizer();

    const resumeWords = tokenizer.tokenize(resumeText.toLowerCase());
    const jobWords = tokenizer.tokenize(jobDescription.toLowerCase());

    const matchCount = resumeWords.filter(word => jobWords.includes(word)).length;
    const score = ((matchCount / jobWords.length) * 100).toFixed(2);

    res.json({
        message: "Resume analyzed successfully",
        score: `${score}%`,
        matchedWords: matchCount,
        totalJobWords: jobWords.length
    });
};