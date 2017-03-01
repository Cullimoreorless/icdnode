
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
    res.send('The File SAVED AND THIS REQUEST IS DONE');
  };
  return {
    getSiteConfigPage: getSiteConfigPage,
    saveSiteConfig: saveSiteConfig
  };
};

module.exports = adminController;