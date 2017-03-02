var express = require('express');
var adminRouter = express.Router();
var passport = require('passport');

var router = function(adminController, photoUpload){
  adminRouter.use(function(req, res, next){
    if(!req.user){
      res.redirect('/login');
    }
    next();
  });
  
  adminRouter.route('/portal')
    .get(adminController.getSiteConfigPage);

  adminRouter.post('/siteconfig', 
    photoUpload.single('logophoto'),
    adminController.saveSiteConfig);

  adminRouter.route('/projects')
    .get(adminController.getProjectList);

  adminRouter.route('/new-project')
    .get(adminController.getNewProjectPage);

  adminRouter.route('/project/:projecturl')
    .get(adminController.editProjectPage);

  adminRouter.route('/saveproject')
    .post(adminController.saveProject);

  return adminRouter;
};

module.exports = router;