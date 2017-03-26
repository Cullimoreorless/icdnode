'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userid:  {type:DataTypes.INTEGER, allowNull:false, autoIncrement:true,primaryKey:true},
    username: {type:DataTypes.STRING, unique:true},
    passwordhash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};