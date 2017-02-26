var Sequelize = require('sequelize');

module.exports = function(db, Project){
  var Photo = db.define('photo', {
    photoid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    url: Sequelize.STRING,
    caption: Sequelize.STRING(100),
    title: Sequelize.STRING(60),
    type: Sequelize.ENUM('Banner','Tile'),
    order: Sequelize.INTEGER
  });
  Photo.belongsTo(Project, {as: 'project'});
  return Photo;
};