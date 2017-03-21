var Sequelize = require('sequelize');


module.exports = function(db){
  var Photo = db.define('photo', {
    photoid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    url: Sequelize.STRING,
    caption: Sequelize.STRING(100),
    title: Sequelize.STRING(60),
    description: Sequelize.STRING(1000),
    type: Sequelize.ENUM('Banner','Tile','Page'),
    order: Sequelize.INTEGER
  });
  return Photo;
};