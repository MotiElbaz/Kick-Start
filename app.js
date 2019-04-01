// CONST Configuration =======================================
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const multer=require('multer');
//============================================================

// Server Configuration ======================================
const app = express();
const PORT = 8081;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname , 'client')));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//============================================================

// DB Configuration ==========================================
const config = require('./config/db');
mongoose.connect(config.database,{ useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('Database is up and running ...');
});
mongoose.connection.on('error', (err) => {
  console.log('Error while setting up the database : ' + err);
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, UPLOAD_PATH)
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })
//============================================================

// Routes ============================================
const users = require('./models/users');
const projects = require('./models/projects');
const images = require('./models/images');
app.use('/users',users);
app.use('/projects',projects);
app.use('/images',images);
const newLocal = 'uploads';
const UPLOAD_PATH = newLocal;
//============================================================

// Route to index ============================================
app.get('/', function (req, res) {
  res.send('Server is running ...');
})
//============================================================

// Server Listener ===========================================
var server = app.listen(PORT,function () {
  console.log("Server running at %s", PORT)
})
//============================================================
