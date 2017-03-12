var express = require('express');
var projectRouter = express.Router();

var router = function(projectController){
  //todo: home page using get featured call
  projectRouter.route('/:projecturl')
    .get(projectController.getProjectPage);
  
  return projectRouter;
};

module.exports = router;