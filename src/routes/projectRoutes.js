var express = require('express');
var projectRouter = express.Router();

var router = function(projectController){
  //todo: home page using get featured call
  projectRouter.route('/project-detail/:projecturl');
  return projectRouter;
};

module.exports = router;