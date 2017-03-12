
var projectController = function(projectService){
  var getProjectPage = function(req, res){
    projectService.getProjectDetails(req.params.projecturl, 
      function(err, project){
        if(project){
          var tilePhotos = [];
          var bannerPhoto = null;
          project.photos.map(function(photo){
            if(photo.type === 'Tile'){
              tilePhotos.push(photo);
            }
            else if(photo.type ==='Banner'){
              bannerPhoto = photo;
            }
          });
          res.render('projects/projectdetail',{
            project:project, 
            tilePhotos: tilePhotos,
            bannerPhoto: bannerPhoto
          });
        }
      }
    );
  };

  return {
    getProjectPage: getProjectPage
  };
}

module.exports = projectController;