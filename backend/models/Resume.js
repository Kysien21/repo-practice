const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    originalFile: String,
    optimizedFile: String,
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);