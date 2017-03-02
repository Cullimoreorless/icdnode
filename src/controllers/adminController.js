
var adminController = function(siteConfigService){
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
    res.send('project list');
  };

  return {
    getSiteConfigPage: getSiteConfigPage,
    saveSiteConfig: saveSiteConfig,
    getProjectList: getProjectList
  };
};

module.exports = adminController;