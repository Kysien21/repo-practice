const fs = require('fs');
const path = require('path');

exports.uploadResume = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    // Just responding without deleting the file for now
    res.status(200).json({
        message: 'Resume uploaded successfully',
        filePath,
        success: true
    });

    // Uncomment later if you want to delete file:
    // fs.unlink(filePath, (err) => {
    //     if (err) {
    //         console.error('Failed to delete uploaded resume', err);
    //         return res.status(500).json({
    //             message: 'Error processing file'
    //         });
    //     }
    // });
}