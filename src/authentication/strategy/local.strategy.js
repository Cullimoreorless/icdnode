var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports = function(userService){
  passport.use(new LocalStrategy({
    usernameField:'username',
    passwordField: 'password'
  }, userService.testPassword));
};