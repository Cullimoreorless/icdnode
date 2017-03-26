'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userid: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: {type:DataTypes.STRING(50), unique:true},
    passwordhash: DataTypes.STRING(500)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};