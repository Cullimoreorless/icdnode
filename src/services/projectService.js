var projectService = function(models){
  var getProjectsList = function(callback){
    models.Project.findAll({attributes:['name','teaser','featured','url']}).then(function(response){
      callback(null, response);
    }).error(function(error){
      callback(error, false);
    });
  };

  var getProjectToEdit = function(projecturl, callback){
    models.Project.findAll({where: {url: projecturl}}).then(function(projects){
      callback(null, projects[0]);
    }).error(function(error){
      callback(error, false);
    })
  };

  var encodeProjectName = function(projectName){
    return projectName.toLowerCase().replace(/( )/g,'-').replace(/[^A-Za-z0-9-]/g, '');
  }

  var saveProject = function(project, callback){
    var encodedProjectName = encodeProjectName(project.name);
    project.url = encodedProjectName;
    if(project.projectid){
      models.Project.update(project, {where:{projectid: project.projectid}})
        .then(function(response){
          callback(null, encodedProjectName);
        }).error(function(error){
          callback(error, false);
        });
    }
    else{
      models.Project.create(project).then(function(response){
        callback(null, encodedProjectName);
      }).error(function(error){
        callback(error, false);
      });
    }
  };

  return {
    getProjectsList: getProjectsList,
    getProjectToEdit: getProjectToEdit,
    saveProject: saveProject
  };
};

module.exports = projectService;