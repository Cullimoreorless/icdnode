'use strict';
module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define('Project', {
    projectid:  {type:DataTypes.INTEGER, allowNull:false, autoIncrement:true,primaryKey:true},
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    teaser: DataTypes.STRING,
    featured: DataTypes.BOOLEAN,
    showphototext: DataTypes.BOOLEAN
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