//var bcrypt = require('bcrypt');
var simplecrypt = require('simplecrypt');
var sc = simplecrypt();

var userService = function(models){
  var saltRounds = 10;
  var createUser = function(user, callback){
    //var salt = bcrypt.genSaltSync(10);
    //var passwordHash = bcrypt.hashSync(user.password, salt);
    var passwordHash = sc.encrypt(user.password);
    models.User.create({username:user.username, passwordhash:passwordHash}).then(function(response){
      callback(null, response);
    }).error(function(error){
      callback(error, null);
    });
  };

  var getUserByUsername = function(username){
    return models.User.findAll({
      where: {
        username: username
      }
    });
  };

  var testPassword = function(username, password, done){
    getUserByUsername(username).then(function(response){
      var userFromDB = response[0];
      //if(bcrypt.compareSync(password, userFromDB.passwordhash)){
      if(sc.encrypt(password) === userFromDB.passwordhash){
        done(null, userFromDB);
      }
      else{
        done(null, false, {message:'Could not sign in'});
      }
    }).error(function(error){
      done(error, false);
    });
  };

  return {
    createUser:createUser,
    testPassword:testPassword
  };
};

module.exports = userService;