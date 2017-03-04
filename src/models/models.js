var models = function(db){
  var User = require('./user')(db);
  var Photo = require('./photo')(db);
  var Project = require('./project')(db, Photo);
  return {
    User: User,
    Project: Project,
    SiteConfiguration: require('./siteconfiguration')(db),
    Photo: Photo
  };
};

module.exports = models;