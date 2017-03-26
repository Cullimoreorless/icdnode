'use strict';
module.exports = function(sequelize, DataTypes) {
  var SiteConfiguration = sequelize.define('SiteConfiguration', {
    siteconfigurationid:  {type:DataTypes.INTEGER, allowNull:false, autoIncrement:true,primaryKey:true},
    logourl: DataTypes.STRING,
    logoalttext: DataTypes.STRING,
    introtext: DataTypes.STRING(1000),
    contactemail: DataTypes.STRING,
    sitetitle: DataTypes.STRING,
    personalname: DataTypes.STRING,
    personalblurb: DataTypes.STRING(1000),
    contactphoto: DataTypes.STRING,
    resumeurl: DataTypes.STRING,
    linkedinurl: DataTypes.STRING,
    facebookurl: DataTypes.STRING,
    instagramurl: DataTypes.STRING,
    twitterurl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SiteConfiguration;
};