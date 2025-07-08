const Feedback = require('../models/Feedback');

exports.getFeedback = async(req, res) => {
    try {
        const feedback = await Feedback.find({ userId: req.session.user._id });
        res.json({ message: 'Feedback retrieved', feedback });
    } catch (err) {
        console.error('Error getting feedback:', err);
        res.status(500).json({ message: 'Failed to get feedback' });
    }
};

exports.submitFeedback = async(req, res) => {
    const userId = req.session.user._id;
    const {
        relevanceToJob,
        experience,
        education,
        consistencyAccuracy
    } = req.body;

    try {
        const feedback = new Feedback({
            userId,
            relevanceToJob,
            experience,
            education,
            consistencyAccuracy
        });

        await feedback.save();

        res.status(201).json({ message: 'Feedback saved successfully', feedback });
    } catch (err) {
        console.error('Error saving feedback:', err);
        res.status(500).json({ message: 'Failed to save feedback' });
    }
};