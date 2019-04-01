// CONST Configuration ============================================
const express = require('express');
const router = express.Router();
const Project = require('../services/project');
const Statistic = require('../services/statistic');

//=================================================================

// Interval ======================================================
setInterval(() => {
  Project.find(function(err, projects) {
    if (err) throw err;
    var allProjects = [];
    for(var i = 0 ; i < projects.length ; i++){
      var email = projects[i].managerEmail;
      Project.getProjectByEmail(email , (err,project) => {
        if(err) throw err;
        if(project){
          var tempDate = new Date(project.dateOfTarget);
          var date2 = new Date();
          var timeDiff = date2.getTime() - tempDate.getTime();
          if(timeDiff >= 0){
            Project.deleteProject(project);
            if(project.target <= project.sum){
              Statistic.findStat(1, (err,statistic) => {
                if(statistic){
                  statistic.success++;
                  statistic.save();
                }
              } );
            }
          }
        }
      });
    }
  });
}, 10000);
//================================================================

// REST Configuration ============================================
router.get('/getStatistic' , (req,res,next) => {
  Statistic.findStat(1, (err,statistic) => {
    if(!statistic){
      res.json({success : false , msg:'No Statistic yet'});
    }
    else{
      res.json({success : true , statistic : statistic});
    }
  } );
});


router.post('/addProject' , (req , res , next) => {
  let newProject = new Project({
    name : req.body.name,
    description : req.body.description,
    managerEmail : req.body.managerEmail,
    donaters : req.body.donators,
    target : req.body.target,
    sum : 0,
    /*images : req.body.images,*/
    video : req.body.video,
    target : req.body.target,
    dateOfTarget : req.body.dateOfTarget
  });
  Project.getProjectByEmail(newProject.managerEmail , (err,project) => {
    if(err) throw err;
    if(project){
      res.json({success: false, msg: 'User already got a running project'});
    } else {
      Project.addProject(newProject , (err,project) => {
        if(err){
          res.json({success : false , msg:'Failed to sumbit project'});
        } else {
          Statistic.findStat(1, (err,statistic) => {
            if(!statistic){
              let newStat = new Statistic({
                id : 1,
                success : 0,
                projects : 1
              });
              Statistic.addStat(newStat , (err,stat) =>{
              })
            }
            else{
              statistic.projects++;
              statistic.save();
            }
          } );
          res.json({success : true , msg:'Project added successfuly'});
        }
      });
    }
  });
});

router.get('/getProject/:email' , (req,res,next) => {
  var email = req.params.email;
  Project.getProjectByEmail(email , (err,project) => {
    if(err) throw err;
    if(project){
      res.json({success : true , project : project});
    } else {
      res.json({success : false , msg:'This user has no project'});
    }
  });
});

router.post('/update' , (req,res,next) => {
  var name = req.body.name;
  var email = req.body.managerEmail;
  var description = req.body.description;
  var target = req.body.target;
  var date = req.body.dateOfTarget;
  var video = req.body.video;
  Project.getProjectByEmail(email , (err,project) => {
    if(err) throw err;
    if(project){
      let newProject = project;
      newProject.name = name;
      newProject.description = description;
      newProject.target = target;
      newProject.date = date;
      newProject.video = video;
      project = newProject;
      project.save();
      res.json({
        success : true ,
        msg:'Project updated' ,
        project : project
      });
    } else {
      res.json({success : false , msg:'There is no such project'});
    }
  });
});

router.post('/donate' , (req,res,next) => {
  let donation = {
    name : req.body.name,
    donatorName : req.body.donatorName,
    sum : req.body.sum
  };
  Project.getProjectByName(donation.name , (err,project) => {
    if(err) throw err;
    if(project){
      let newProject = project;
      var tempInt = parseFloat(donation.sum)
      newProject.sum+=tempInt;
      newProject.donators.push(donation.donatorName);
      project = newProject;
      project.save();
      res.json({
        success : true ,
        msg:'Donate accepted' ,
        project : project
      });
    } else {
      res.json({success : false , msg:'There is no such project'});
    }
  });
});

router.get('/projectsList' , (req,res,next) => {
    Project.find(function(err, projects) {
           if (err) throw err;
           res.json(projects);
    });
});
//=================================================================

// Export ============================================
module.exports = router;
//=================================================================
