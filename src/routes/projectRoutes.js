var express = require('express');
var projectRouter = express.Router();

var router = function(projectController){
    
  projectRouter.route('/:projecturl')
    .get(projectController.getProjectPage);
  
  return projectRouter;
};

module.exports = router;