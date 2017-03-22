
var ejs = require('ejs');

var adminController = function(siteConfigService, projectService, photoService){
  var getSiteConfigPage = function(req, res){
    siteConfigService.getSiteConfig(function(err, conf){
      res.render('admin/siteconfig');
    });
  };

  var saveSiteConfig = function(req, res){

    siteConfigService.saveSiteConfig(
      {
        logourl: req.body.logourl,
        logoalttext: req.body.logoalttext,
        sitetitle: req.body.sitetitle,
        introtext: req.body.introtext,
        contactemail: req.body.contactemail,
        contactphoto: req.body.contactphoto,
        personalblurb:req.body.personalblurb,
        personalname: req.body.personalname,
        resumeurl: req.body.resumeurl,
        linkedinurl: req.body.linkedinurl,
        instagramurl: req.body.instagramurl,
        facebookurl: req.body.facebookurl,
        twitterurl: req.body.twitterurl
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

  var deleteProject = function(req, res){
    projectService.deleteProject(req.params.projectid, function(err, result){
      res.send(result);
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
      var pathToTemplate = retPhoto.type === 'Tile' || retPhoto.type === 'Page' ? '/../views/admin/phototablerow.ejs' : '/../views/admin/bannerphoto.ejs'
      ejs.renderFile(__dirname + pathToTemplate, 
        {photo: retPhoto, bannerPhoto: retPhoto},
        function(error, responseString){
          if(responseString){
            res.send({html:responseString, photoid: retPhoto.photoid, phototype: retPhoto.type});
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
    savePhoto: savePhoto,
    deleteProject: deleteProject
  };
};

module.exports = adminController;