const History = require('../models/History')

exports.getUserHistory = async(req, res) => {
    const history = await History.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ message: "History fetched", history });
}