const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { addSlider ,getSlider} = require('../controllers/slider');

const router = express.Router();

// Create upload directory if it doesn't exist
const uploadDir = 'upload/images';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'upload/images'; 
        
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

// File type validation
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Error: File type not allowed!'));
};

// Initialize multer
const upload = multer({ storage, fileFilter });

// POST route for creating a slider
router.post('/slider', upload.single('photo'), addSlider);

// Get route for slide api

router.get('/getslider', getSlider)

module.exports = router;
