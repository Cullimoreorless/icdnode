
var projectController = function(projectService){
  var getProjectPage = function(req, res){
    projectService.getProjectDetails(req.params.projecturl, 
      function(err, project){
        if(project){
          res.render('projects/projectdetail',{project:project});
        }
      }
    );
  };

  return {
    getProjectPage: getProjectPage
  };
}

module.exports = projectController;