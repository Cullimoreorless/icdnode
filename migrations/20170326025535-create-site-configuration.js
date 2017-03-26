'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('SiteConfigurations', {
      siteconfigurationid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logourl: {
        type: Sequelize.STRING
      },
      logoalttext: {
        type: Sequelize.STRING
      },
      introtext: {
        type: Sequelize.STRING(1000)
      },
      contactemail: {
        type: Sequelize.STRING
      },
      sitetitle: {
        type: Sequelize.STRING
      },
      personalname: {
        type: Sequelize.STRING
      },
      personalblurb: {
        type: Sequelize.STRING(1000)
      },
      contactphoto: {
        type: Sequelize.STRING
      },
      resumeurl: {
        type: Sequelize.STRING
      },
      linkedinurl: {
        type: Sequelize.STRING
      },
      facebookurl: {
        type: Sequelize.STRING
      },
      instagramurl: {
        type: Sequelize.STRING
      },
      twitterurl: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('SiteConfigurations');
  }
};