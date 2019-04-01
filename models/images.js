// CONST Configuration ============================================
const express = require('express');
const router = express.Router();
const Image = require('../services/image');
const path = require('path');
const fs = require('fs');
const del = require('del');
const multer = require('multer');
const UPLOAD_PATH = 'uploads';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
  })
  const upload = multer({ storage: storage })
//=================================================================

// REST Configuration ============================================
router.post('/upload', upload.single('image'), (req, res, next) => {
    let newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.managerEmail = req.body.managerEmail;
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.json({success : true , msg:'Uploaded successfully!'});
    });
});
 
router.get('/images/:managerEmail', (req, res, next) => {
    let managerEmail = req.params.managerEmail;
    let query = { managerEmail : managerEmail}
    Image.findOne(query, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    })
});
 
router.delete('/images/:managerEmail', (req, res, next) => {
    let imgId = req.params.id;
 
    findByIdAndRemove(managerEmail, (err, image) => {
        if (err && image) {
            res.sendStatus(400);
        }
 
        del([join(UPLOAD_PATH, image.filename)]).then(deleted => {
            res.sendStatus(200);
        })
    })
});
//=================================================================

// Export ============================================
module.exports = router;
//=================================================================