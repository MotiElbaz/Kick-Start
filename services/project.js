// CONST Configuration ============================================
const mongoose = require('mongoose');
const config = require('../config/db');
//=================================================================

// User Schema Configuration ============================================
const projectSchema = mongoose.Schema({
  name : {
    type : String ,
    required : true
  },
  description : {
    type : String ,
    required : true
  },
  managerEmail : {
    type : String ,
    required : true
  },
  donators : [],
  target : {
    type : Number,
    default : 0
  },
  sum : {
    type : Number,
    default : 0
  },
  /*images : {
    type : [String] ,
    required : true
  },*/
  video : {
    type : String,
    required : true
  },
  target : {
    type : Number,
    required : true
  },
  dateOfTarget : {
    type: Date,
    default: Date.now
  }
});
const Project = module.exports = mongoose.model('Project' , projectSchema);
//=================================================================

// Functions Configuration ============================================
module.exports.getProjectById = function(id , callback) {
  Project.findById(id , callback);
};

module.exports.getProjectByEmail = function(managerEmail , callback) {
  const query = {managerEmail : managerEmail};
  Project.findOne(query , callback);
};

module.exports.getProjectByName = function(name , callback) {
  const query = {name : name};
  Project.findOne(query , callback);
};

module.exports.addProject = function(newProject , callback) {
  newProject.save(callback);
};

module.exports.donateToProject = function(project , callback) {
  project.save();
};

module.exports.deleteProject = function(project,callback){
  const query = {name : project.name};
  project.remove();
}

/*module.exports.updateProject = function(updatedProject) {
  Project.findOne({ name: updatedProject.name }, function (err, doc){
    doc = updatedProject;
    doc.save();
  });
};

module.exports.donateToProject = function(name , donation) {
  const query = {name : name};
  Project.findOne(query , (err , doc) => {
    doc.sum += donation;
    doc.save();
  });
};*/
//=================================================================
