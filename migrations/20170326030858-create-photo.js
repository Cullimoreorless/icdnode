'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Photos', {
      photoid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      caption: {
        type: Sequelize.STRING(100)
      },
      title: {
        type: Sequelize.STRING(60)
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      type: {
        type: Sequelize.ENUM('Banner','Tile','Page')
      },
      order: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Photos');
  }
};