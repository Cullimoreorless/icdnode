var Sequelize = require('sequelize');

var projectFunction = function(db){
  var Project = db.define('project',{
    name:{ type: Sequelize.STRING(50) },
    url: { type: Sequelize.STRING(60), unique:true },
    description: { type: Sequelize.STRING(1000) },
    teaser: { type: Sequelize.STRING },
    featured: { type: Sequelize.BOOLEAN }
  });

  return Project;
};

module.exports = projectFunction;