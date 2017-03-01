
var siteConfigService = function(models){
  var getSiteConfig = function(callback){
    models.SiteConfiguration.findAll().then(function(configuration){
      console.log(configuration);
      callback(null, configuration[0]);
    }).error(function(error){
      callback(error, false);
    });
  };

  var saveSiteConfig = function(siteConfigData, callback){
    models.SiteConfiguration.update(siteConfigData, { where: {siteconfigurationid:1}}).then(function(response){
      callback(null, response);
    }).error(function(error){
      callback(error, false);
    });
  };

  return {
    getSiteConfig: getSiteConfig,
    saveSiteConfig: saveSiteConfig
  };
};

module.exports = siteConfigService;