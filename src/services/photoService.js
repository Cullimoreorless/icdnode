var photoService = function(models){
  var savePhoto = function(photoToSave, callback){
    photoToSave.photoid = parseInt(photoToSave.photoid);
    if(photoToSave.photoid){
      models.Photo.update(photoToSave, 
        {where:{photoid: photoToSave.photoid}, include:{model:models.Project}})
        .then(function(response){
          models.Photo.findById(parseInt(photoToSave.photoid)).then(function(photo){
            callback(null, photo);
          });
        }).error(function(error){
          callback(error, false);
        });
    }
    else{
      photoToSave.order = 5000;
      models.Photo.create(photoToSave).then(function(savedPhoto){
        models.Project.findById(parseInt(photoToSave.projectprojectid)).then(function(project){
          project.addPhoto(savedPhoto).then(function(response){
            callback(null, savedPhoto);
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

  var savePhotosOrder = function(photoIds, callback){
    models.sequelize.transaction(function(t){
      var promises = [];
      photoIds.forEach(function(photoId){
        promises.push(
          models.Photo.update(
            {order:photoId.index},
            {where:{photoid:photoId.id}},
            {transaction:t}
          )
        );
      });
      return Promise.all(promises);
    }).then(function(response){
      callback(null, response);
    }).error(function(error){
      callback(error, null);
    })
  };

  return {
    savePhoto: savePhoto,
    deletePhoto: deletePhoto,
    savePhotosOrder: savePhotosOrder
  };
};

module.exports = photoService;