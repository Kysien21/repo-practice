const Feedback = require('../models/Feedback');

// ✅ Gamiton ni sa /feedback route para ipakita ang auto-generated feedback sa user
exports.getFeedback = async(req, res) => {
    try {
        const feedback = await Feedback.find({ userId: req.session.user._id });
        res.json({ message: 'Your Analytics', feedback });
    } catch (err) {
        console.error('Error getting feedback:', err);
        res.status(500).json({ message: 'Failed to get feedback' });
    }
};