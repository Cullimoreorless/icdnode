
var adminController = function(siteConfigService){
  var getSiteConfigPage = function(req, res){
    siteConfigService.getSiteConfig(function(err, conf){
      console.log(conf);
      res.render('admin/siteconfig',{
        conf: conf
      });
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
        introtext: req.body.introtext
      },
      function(err, response){
        res.render('admin/siteconfig',{
          conf: response
        });
      }
    );
  };
  return {
    getSiteConfigPage: getSiteConfigPage,
    saveSiteConfig: saveSiteConfig
  };
};

module.exports = adminController;