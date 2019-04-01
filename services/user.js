// CONST Configuration ============================================
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');
//=================================================================

// User Schema Configuration ============================================
const userSchema = mongoose.Schema({
  name : {
    type : String
  },
  email : {
    type : String ,
    required : true
  },
  password : {
    type : String ,
    required : true
  },
  permission : {
    type : String ,
    required : true
  }
});
const User = module.exports = mongoose.model('User' , userSchema);
//=================================================================

// Functions Configuration ============================================
module.exports.getUserById = function(id , callback) {
  User.findById(id , callback);
};

module.exports.getUserByEmail = function(email , callback) {
  const query = {email : email};
  User.findOne(query , callback);
};

module.exports.addUser = function(newUser , callback) {
  bcrypt.genSalt(10 ,  (err,salt) => {
    bcrypt.hash(newUser.password , salt , (err,hash) => {
      if(err){
        throw err;
      } else {
        newUser.password = hash;
        newUser.save(callback);
      }
    });
  });
};

module.exports.comparePassword = function(passwordToCompare , hash , callback) {
  bcrypt.compare(passwordToCompare , hash , (err , isMatch) => {
    if(err){
      throw err;
    }
    callback(null,isMatch);
  });
};
//=================================================================
