const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadcontroller = require('../controllers/uploadController')

const router = express.Router();


// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

const storage = multer.memoryStorage();

// ✅ File filter para PDF ug DOCX ra
const fileFilter = function(req, file, cb) {
    const fileTypes = /pdf|docx/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('Only .pdf and .docx files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
router.post('/upload', upload.single('resume'), uploadcontroller.uploadResume)


module.exports = router;