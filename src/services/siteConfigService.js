
var siteConfigService = function(models){
  var getSiteConfig = function(callback){
    models.SiteConfiguration.findAll().then(function(configuration){
      console.log(configuration);
      callback(null, configuration[0]);
    }).error(function(error){
      callback(error, false);
    });
  };

  return {
    getSiteConfig: getSiteConfig
  };
};

module.exports = siteConfigService;