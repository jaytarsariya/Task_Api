const express = require("express");
const router = express.Router();

const { register, login, createblog, editblog, deleteblog, viewblog, likecommet, shareblog } = require("../controller/UserController");
const auth = require('../middleware/Auth');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        try {
            const filepath = path.join(__dirname, "../public");
            if (!filepath) {
                await fs.mkdir(filepath);
                cb(null, filepath)
            }
            else {
                cb(null, filepath)
            }
        } catch (error) {
            console.log('File uplod folder created error', error);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})
const uploadStorage = multer({ storage: storage })


 
router.post('/register', register);
router.post('/login', login);
router.post('/createblog', auth, uploadStorage.single('file'), createblog);
router.put('/editblog/:id', auth, uploadStorage.single('file'), editblog);
router.put('/deleteblog/:id', auth, deleteblog);
router.get('/viewblog', viewblog);
router.get('/likecommet/:id', likecommet);
router.get('/shareblog/:id', shareblog);
module.exports = router;