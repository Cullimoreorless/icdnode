var Sequelize = require('sequelize');

var userFunction = function(db){
  var User = db.define('user',{
    userid: { type:Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: Sequelize.STRING(50), unique: true }, 
    passwordhash: Sequelize.STRING(500)
  });

  return User;
};

module.exports = userFunction;