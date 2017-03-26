'use strict';
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define('Photo', {
    photoid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: DataTypes.STRING,
    caption: DataTypes.STRING(100),
    title: DataTypes.STRING(60),
    description: DataTypes.STRING(1000),
    type: DataTypes.ENUM('Banner','Tile','Page'),
    order: DataTypes.INTEGER,
    displaycaption: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Photo;
};