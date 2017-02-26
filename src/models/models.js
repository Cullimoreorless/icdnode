var models = function(db){
  var User = require('./user')(db);
  var Project = require('./project')(db);
  return {
    User: User,
    Project: Project,
    SiteConfiguration: require('./siteconfiguration')(db)
  };
};

module.exports = models;