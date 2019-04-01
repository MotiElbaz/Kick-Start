// CONST Configuration ============================================
const mongoose = require('mongoose');
const config = require('../config/db');
//=================================================================

// User Schema Configuration ============================================
const statisticSchema = mongoose.Schema({
    id : {
        type : Number,
        default : 0
    },
    projects : {
      type : Number ,
      default : 0
    },
    success : {
        type : Number ,
        default : 0
    }
  });
  const Statistic = module.exports = mongoose.model('Statistic' , statisticSchema);
  //=================================================================

  // Functions Configuration ============================================
module.exports.findStat = function(stat , callback) {
    const query = {id : 1};
    Statistic.findOne(query , callback);
  };

  module.exports.addStat = function(stat , callback) {
      stat.save(callback);
  }
  
  //=================================================================