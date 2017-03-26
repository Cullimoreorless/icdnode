'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    projectid: {type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    teaser: DataTypes.STRING,
    featured: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Project.hasMany(models.Photo);
      }
    }
  });
  return Project;
};