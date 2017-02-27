var express = require('express');
var adminRouter = express.Router();
var passport = require('passport');

var router = function(){
  adminRouter.route('/signIn')
    .get(function(req, res){
      res.render('login');
    })
    .post(passport.authenticate('local', {
      failureRedirect:'/admin/signIn'
    }), function(req, res){
      res.redirect('/admin/portal');
    });
  
  adminRouter.route('/portal')
    .all(function(req, res, next){
      if(!req.user){
        res.redirect('/admin/signIn');
      }
      next();
    })
    .get(function(req, res){
      res.send('You are logged in');
    });

  return adminRouter;
}

module.exports = router;