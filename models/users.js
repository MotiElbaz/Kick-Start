// CONST Configuration ============================================
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../services/user');
const config = require('../config/db');
const Project = require('../services/project');
//=================================================================

// REST Configuration ============================================
router.post('/register' , (req , res , next) => {
  let newUser = new User({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password ,
    permission : req.body.permission
  });
  User.getUserByEmail(newUser.email , (err,user) => {
    if(err) throw err;
    if(user){
      res.json({success: false, msg: 'Email already in use'});
    } else {
      User.addUser(newUser , (err , user) => {
        if(err){
          res.json({success : false , msg:'Failed to register user'});
        } else {
          res.json({success : true , msg:'User registered successfuly'});
        }
      });
    }
  });
})

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: '7d'
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.get('/profile' ,passport.authenticate('jwt' , {session: false}), (req , res , next) => {
  let user = req.user;
  if(user.permission == 'pm'){
    Project.getProjectByEmail(user.email , (err,project) => {
      if(err) throw err;
      if(project){
        res.json({permission: 'pm', project: project , user : user});
      } else {
        res.json({permission: 'pm', project: null , user : user});
      }
    });
  }else if(user.permission == 'donator'){
    Project.find(function(err, projects) {
           if (err) throw err;
           res.json({permission : 'donator' , user : req.user , projects : projects});
    });
  } else {
    Project.find(function(err, projects) {
           if (err) throw err;
           res.json({permission : 'admin' , user : req.user , projects : projects});
    });
  }
})
//=================================================================

// Export ============================================
module.exports = router;
//=================================================================
