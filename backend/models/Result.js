const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    resumeText: String,
    jobDescription: String,
    overallScore: Number,
    sectionScores: {
        Skills: Number,
        Experience: Number,
        Education: Number
    },
    feedback: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);