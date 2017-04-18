var projectService = function(models){
  var getProjectsList = function(callback){
    models.Project.findAll({attributes:['projectid','name','teaser','featured','url']}).then(function(response){
      callback(null, response);
    }).error(function(error){
      callback(error, false);
    });
  };

  var getProjectToEdit = function(projecturl, callback){
    models.Project.findAll({where: {url: projecturl}, 
                            include: { model: models.Photo, orderBy: 'order' }})
    .then(function(projects){
      console.log(projects);
      callback(null, projects[0]);
    }).error(function(error){
      callback(error, false);
    });
  };

  var encodeProjectName = function(projectName){
    return projectName.toLowerCase().replace(/( )/g,'-').replace(/[^A-Za-z0-9-]/g, '');
  };

  var saveProject = function(project, callback){
    console.log(project);
    var encodedProjectName = encodeProjectName(project.name);
    if(project.filename){
      project.processdocumenturl = project.filename;
    }
    
    project.showprocess = project.showprocess ? true : false;
    
    project.featured = project.featured ? true : false;
    project.showphototext = project.showphototext ? true : false;
    project.url = encodedProjectName;
    if(parseInt(project.projectid)){
      models.Project.update(project, {where:{projectid: project.projectid}})
        .then(function(response){
          callback(null, encodedProjectName);
        }).error(function(error){
          callback(error, false);
        });
    }
    else{
      models.Project.create(project, {include:models.Photo}).then(function(response){
        callback(null, encodedProjectName);
      }).error(function(error){
        callback(error, false);
      });
    }
  };

  var getFeaturedProjects = function(callback){
    models.Project.findAll(
      { where:{featured:true}, 
        order: [['createdAt','DESC']],
        include: [{
          model: models.Photo,
          order: 'order',
          where: {type: 'Tile'}
        }]
      }).then(function(projects){
        console.log(projects);
        callback(null, projects);
      }).error(function(err){
        callback(err, false);
      });
  };

  var getNonFeaturedProjects = function(callback){
    models.Project.findAll(
      { where:{featured:false}, 
        order: [['createdAt','DESC']],
        include: [{
          model: models.Photo,
          order: 'order',
          where: {type: 'Tile'}
        }]
      }).then(function(projects){
        console.log(projects);
        callback(null, projects);
      }).error(function(err){
        callback(err, false);
      });
  };

  var getProjectDetails = function(projecturl, callback){
    
    models.Project.findAll(
      { where:{url:projecturl},
        include: [{ model: models.Photo, orderBy: 'order' }]
      }).then(function(projects){
        var projectToReturn = projects[0];
        callback(null, projectToReturn);
      }).error(function(error){
        callback(error, false);
      });
  };

  var deleteProject = function(projectId, callback){
    models.Project.destroy({where:{projectid:projectId}})
      .then(function(response){
        callback(null, true);
      }).error(function(error){
        callback(error, false);
      });
  };

  return {
    getProjectsList: getProjectsList,
    getProjectToEdit: getProjectToEdit,
    saveProject: saveProject,
    getFeaturedProjects: getFeaturedProjects,
    getNonFeaturedProjects: getNonFeaturedProjects,
    getProjectDetails: getProjectDetails,
    deleteProject: deleteProject
  };
};

module.exports = projectService;