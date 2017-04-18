var express = require('express');
var adminRouter = express.Router();
var passport = require('passport');
var ejs = require('ejs');

var router = function(adminController, photoUpload, multiUpload){
  adminRouter.use(function(req, res, next){
    if(!req.user){
      res.redirect('/login');
    }
    next();
  });
  
  adminRouter.route('/portal')
    .get(adminController.getSiteConfigPage);

  adminRouter.post('/siteconfig', 
    multiUpload.fields([
      {name:'resumeurl', maxCount:1 },
      {name:'contactphoto', maxCount:1},
      {name:'logourl', maxCount:1} 
    ]),
    adminController.saveSiteConfig);

  adminRouter.route('/projects')
    .get(adminController.getProjectList);

  adminRouter.route('/new-project')
    .get(adminController.getNewProjectPage);

  adminRouter.route('/project/:projecturl')
    .get(adminController.editProjectPage);

  adminRouter.route('/saveproject')
    .post(photoUpload.single('processdoc'), adminController.saveProject);

  adminRouter.post('/savephoto',
    photoUpload.single('photo'),
    adminController.savePhoto);
  
  adminRouter.route('/savephotosorder')
    .post(adminController.savePhotosOrder)

  adminRouter.route('/deletePhoto/:photoId')
    .get(adminController.deletePhoto);

  adminRouter.route('/deleteproject/:projectid')
    .get(adminController.deleteProject);

  adminRouter.route('/getphotoform')
    .get(function(req, res){
      ejs.renderFile(__dirname + '/../views/admin/photoform.ejs', 
        {photo:{ url: '', caption: '', title: '', description:''}}, 
        function(err, result){
          if(result){
            res.send(result);
          }
        });
    });

  return adminRouter;
};

module.exports = router;