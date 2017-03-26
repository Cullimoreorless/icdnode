'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    photoid: {type:DataTypes.INTEGER, allowNull:false, autoIncrement:true,primaryKey:true},
    url: DataTypes.STRING,
    caption: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING(1000),
    type: DataTypes.ENUM('Banner','Tile','Page'),
    order: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsTo(models.Project, {foreignKey:'projectprojectid'});
      }
    }
  });
  return Photo;
};