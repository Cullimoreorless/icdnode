var Sequelize = require('sequelize');

var siteConfigFunction = function(db){
  var SiteConfiguration = db.define('siteconfiguration', {
    siteconfigurationid: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    logourl: Sequelize.STRING,
    logoalttext: Sequelize.STRING,
    introtext: Sequelize.STRING(1000),
    contactemail: Sequelize.STRING,
    sitetitle: Sequelize.STRING,
    personalname:Sequelize.STRING,
    personalblurb:Sequelize.STRING(1000),
    contactphoto:Sequelize.STRING,
    resumeurl:Sequelize.STRING,
    linkedinurl: Sequelize.STRING,
    facebookurl:Sequelize.STRING,
    instagramurl:Sequelize.STRING,
    twitterurl: Sequelize.STRING
  });

  return SiteConfiguration;
};

module.exports = siteConfigFunction;