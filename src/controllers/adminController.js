
var ejs = require('ejs');

var adminController = function(siteConfigService, projectService, photoService){
  var getSiteConfigPage = function(req, res){
    siteConfigService.getSiteConfig(function(err, conf){
      res.render('admin/siteconfig');
    });
  };

  var saveSiteConfig = function(req, res){
    console.log(req.file);
    console.log(req.body);
    siteConfigService.saveSiteConfig(
      {
        logourl: req.body.filename,
        logoalttext: req.body.logoalttext,
        sitetitle: req.body.sitetitle,
        introtext: req.body.introtext,
        contactemail: req.body.contactemail
      },
      function(err, response){
        console.log(response);
        res.redirect('/admin/portal');
      }
    );
  };

  var getProjectList = function(req, res){
    projectService.getProjectsList(function(err, projects){
      res.render('admin/projectlist', {projects: projects});
    });
  };

  var getNewProjectPage = function(req, res){
    res.render('admin/projectedit', {
      project: {
        projectid:0,
        url:'',
        name:'',
        description:'',
        teaser:'',
        featured: false
      }
    });
  };

  var editProjectPage = function(req, res){
    projectService.getProjectToEdit(req.params.projecturl, function(error, project){
      if(error){
        res.send('Could not find project');
      }
      res.render('admin/projectedit', {
        project: project
      });
    });
  };

  var saveProject = function(req, res){
    projectService.saveProject(req.body, function(error, projecturl){
      if(error){
        res.send('Could not save project');
      }
      res.redirect('/admin/project/'+projecturl);
    });
  };

  var deletePhoto = function(req, res){
    photoService.deletePhoto(req.params.photoId, function(err, result){
      var boolToSend = err ? false : true;
      res.send(boolToSend);
    });
  };

  var savePhoto = function(req, res){
    var photoToSave = {
      photoid: req.body.photoid,
      caption: req.body.caption,
      title: req.body.title,
      description: req.body.description,
      projectid: parseInt(req.body.projectid),
      type: req.body.type
    };
    if(req.body.filename){
      photoToSave.url = req.body.filename;
    }
    photoService.savePhoto(photoToSave, function(error, retPhoto){
      ejs.renderFile(__dirname + '/../views/admin/phototablerow.ejs', 
        {photo: retPhoto},
        function(error, responseString){
          if(responseString){
            res.send({html:responseString, photoid: retPhoto.photoid});
          }
        });
    });
  };

  return {
    getNewProjectPage: getNewProjectPage,
    editProjectPage: editProjectPage,
    getSiteConfigPage: getSiteConfigPage,
    saveSiteConfig: saveSiteConfig,
    getProjectList: getProjectList,
    saveProject:saveProject,
    deletePhoto: deletePhoto,
    savePhoto: savePhoto
  };
};

module.exports = adminController;