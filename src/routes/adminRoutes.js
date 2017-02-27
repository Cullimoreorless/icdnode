var express = require('express');
var adminRouter = express.Router();
var passport = require('passport');

var router = function(){
  adminRouter.use(function(req, res, next){
    // if(!req.user){
    //   res.redirect('/login');
    // }
    next();
  });

  adminRouter.route('/signIn')
    .post(passport.authenticate('local', {
      failureRedirect:'/login'
    }), function(req, res){
      res.redirect('/admin/portal');
    });
  
  adminRouter.route('/portal')
    .all(function(req, res, next){
      if(!req.user){
        res.redirect('/login');
      }
      next();
    })
    .get(function(req, res){
      res.send('You are logged in');
    });

  return adminRouter;
}

module.exports = router;