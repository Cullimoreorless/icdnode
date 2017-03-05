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
      models.Photo.create(photoToSave).then(function(savedPhoto){
        models.Project.findById(parseInt(photoToSave.projectid)).then(function(project){
          project.addPhoto(savedPhoto).then(function(response){
            callback(null, response);
          }).error(function(error){
            callback(error, false);
          });
        }).error(function(error){
          callback(error, false);
        });
      }).error(function(error){
        callback(error, false);
      });
    }
  };

  var deletePhoto = function(deleteId, callback){
    models.Photo.destroy({where: {photoid: parseInt(deleteId)}}).then(function(response){
      callback(null, response);
    }).error(function(error){
      callback(error, false);
    });
  };


  return {
    savePhoto: savePhoto,
    deletePhoto: deletePhoto
  };
}

module.exports = photoService;