
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

  return {
    getProjectPage: getProjectPage
  };
};

module.exports = projectController;