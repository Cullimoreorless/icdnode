var Sequelize = require('sequelize');

var projectFunction = function(db, Photo){
  var Project = db.define('project',{
    projectid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name:{ type: Sequelize.STRING(50) },
    url: { type: Sequelize.STRING(60), unique:true },
    description: { type: Sequelize.STRING(1000) },
    teaser: { type: Sequelize.STRING },
    featured: { type: Sequelize.BOOLEAN }
  });
  Project.hasMany(Photo);
  return Project;
};

module.exports = projectFunction;