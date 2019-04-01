// CONST Configuration ============================================
const mongoose = require('mongoose');
const config = require('../config/db');
//=================================================================

// User Schema Configuration ============================================
const imageSchema = mongoose.Schema({
    filename: String,
    originalName: String,
    managerEmail: String
});
const Image = module.exports = mongoose.model('Image' , imageSchema);
//=================================================================