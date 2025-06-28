const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    score: Number,
    jobDescription: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);