var models = function(db){
  var User = require('./user')(db);
  var Photo = require('./photo')(db);
  var Project = require('./project')(db, Photo);
  Photo.belongsTo(Project);
  return {
    User: User,
    Project: Project,
    SiteConfiguration: require('./siteconfiguration')(db),
    Photo: Photo
  };
};

module.exports = models;