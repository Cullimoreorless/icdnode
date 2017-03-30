var ejs = require('ejs');

var projectController = function(projectService){
  var getProjectPage = function(req, res){
    projectService.getProjectDetails(req.params.projecturl, 
      function(err, project){
        if(project){
          var tilePhotos = [];
          var pagePhotos = [];
          var bannerPhoto = null;
          project.Photos.map(function(photo){
            if(photo.type === 'Tile'){
              tilePhotos.push(photo);
            }
            else if(photo.type === 'Page'){
              pagePhotos.push(photo);
            }
            else if(photo.type ==='Banner'){
              bannerPhoto = photo;
            }
          });
          pagePhotos = pagePhotos.sort(function(a, b){
            if(parseInt(a.order) < parseInt(b.order)){
              return -1;
            }
            else if(parseInt(a.order) == parseInt(b.order)){
              return 0;
            }
            return 1;
          });
          res.render('projects/projectdetail',{
            project:project, 
            tilePhotos: tilePhotos,
            pagePhotos: pagePhotos,
            bannerPhoto: bannerPhoto
          });
        }
      }
    );
  };

  var getNonFeaturedProjects = function(req, res){
    projectService.getNonFeaturedProjects(
      function(err, projects){
        ejs.renderFile(__dirname + '/../views/projects/nonfeaturedprojects.ejs',
          {projects:projects},
          function(error, responseString){
            if(responseString){
              res.send({htmlString:responseString});
            }
          });
      });
  };

  return {
    getProjectPage: getProjectPage,
    getNonFeaturedProjects: getNonFeaturedProjects
  };
};

module.exports = projectController;