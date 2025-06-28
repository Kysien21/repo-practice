const Feedback = require('../models/Feedback');

exports.submitFeedback = async(req, res) => {
    const { rating, comment } = req.body;
    const feedback = new Feedback({ userId: req.user._id, rating, comment });
    await feedback.save();
    res.json({ message: 'Feedback submitted successfully' });
};