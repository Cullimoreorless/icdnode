var photoService = function(models){
  var savePhoto = function(photoToSave, callback){
    photoToSave.photoid = parseInt(photoToSave.photoid);
    if(photoToSave.photoid){
      models.Photo.update(photoToSave, {where:{photoid: photoToSave.photoid},
          include:{model:models.Project}}).then(
        function(response){
          callback(null, response);
        }
      ).error(function(error){
        callback(error, false);
      });
    }
    else{
      models.Project.findById(parseInt(photoToSave.projectid)).then(function(project){
        project.addPhotos([photoToSave]).then(function(response){
          callback(null, response);
        }).error(function(error){
          callback(error, false);
        })
      }).error(function(err){
        callback(err, false);
      });
    }
  };


  return {
    savePhoto: savePhoto
  };
}

module.exports = photoService;