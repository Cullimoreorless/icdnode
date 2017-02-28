
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
    console.log(req.files);//need formidable or connect busboys
  };
  return {
    getSiteConfigPage: getSiteConfigPage,
    saveSiteConfig: saveSiteConfig
  }
}

module.exports = adminController