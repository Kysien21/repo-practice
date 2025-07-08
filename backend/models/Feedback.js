const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    relevanceToJob: {
        skillMatch: Number,
        keywordMatch: Number
    },
    experience: {
        workHistory: Number,
        workHistorySkillMatch: Number
    },
    education: {
        qualification: Number,
        relevance: Number
    },
    consistencyAccuracy: {
        spellingGrammar: Number,
        consistency: Number
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);