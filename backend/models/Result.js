const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    optimizedResume: { type: String, required: true }, // ✅ Save this instead
    jobDescription: String,
    overallScore: Number,
    sectionScores: {
        Skills: Number,
        Experience: Number,
        Education: Number
    },
    missingSkills: [String], // ✅ add if needed
    missingPhrases: [String], // ✅ add if needed
    feedback: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);