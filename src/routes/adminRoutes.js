var express = require('express');
var adminRouter = express.Router();
var passport = require('passport');

var router = function(adminController){
  adminRouter.use(function(req, res, next){
    if(!req.user){
      res.redirect('/login');
    }
    next();
  });
  
  adminRouter.route('/portal')
    .get(adminController.getSiteConfigPage);

  adminRouter.route('/siteconfig')
    .post(adminController.saveSiteConfig);


  return adminRouter;
}

module.exports = router;