var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var Sequelize = require('sequelize');
var multer = require('multer');
var environment = process.env.NODE_ENV || 'dev';
var config = require('./configuration').environments[environment];

var photoDirectory = __dirname + '/public/photos/';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, photoDirectory);
  },
  filename: function (req, file, cb) {
    console.log(file);
    var firstPart = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
    var extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    var parsedFileName = firstPart.replace(/( )/g,'-').replace(/[^A-Za-z0-9-]/g, '');
    req.body.filename = parsedFileName + extension;
    cb(null, parsedFileName + extension);
  }
});
var photoUpload = multer({storage: storage});


var db = new Sequelize(config.dbname, config.dbuser, config.dbpw, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});
var app = express();

var port = process.env.PORT || 5000;


//app set up
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:'icdnode'}));

var models = require('./src/models/models')(db);

var userService = require('./src/services/userService')(models);
require('./src/authentication/passport')(app, userService);

var siteConfigService = require('./src/services/siteConfigService')(models);
var projectService = require('./src/services/projectService')(models);
var photoService = require('./src/services/photoService')(models);


app.use(function(req, res, next){
  siteConfigService.getSiteConfig(function(error, response){
    console.log(response);
    if(response){
      res.locals = {
        conf: response
      };
    }
    next();
  });
});

if(environment === 'dev'){
  db.sync({force:true}).then(function(){
    console.log('db synced');
    //console.log(models);
    models.SiteConfiguration.create({
      logourl:'Screen-Shot-2014-01-15-at-71404-PM.png',
      logoalttext:'Ian C Design',
      introtext:'This is the product design portfolio for Ian Cullimore',
      sitetitle:'Ian C Design',
      contactemail:'me@thisdomain.com'
    });
    projectService.saveProject({
      name: 'Exciting Project',
      description: 'This is the most exciting project from Ian C Design if you don\'t count the others',
      teaser:'This project is exciting',
      featured:true,
      photos:[{
            title:'Logo',
            url: 'Screen-Shot2014-01-15at71404PM.png',
            caption:'You may have noticed this is the logo. Also quite the project',
            description: 'The logo holds both an I shape overall, and a C shape. Clever, eh?',
            type:'Tile',
            order:1
      },{
            title:'KT Logo',
            url: 'KTLogoSample.png',
            caption:'This is a logo for a completely different website',
            description: 'Kamino Traveler is a site that fell apart due to poorly attending meetings by me',
            type:'Tile',
            order:2
      }]
    }, function(err, projecturl){
      console.log(err || 'created' + projecturl);
    });
    projectService.saveProject({
      name: 'Secondary Project',
      description: 'This project is secondary',
      teaser:'What a secondary project',
      featured:true,
      photos:[{
            title:'Map',
            url: 'Screen-Shot-2013-09-06-at-81536-AM.png',
            caption:'Look a map',
            description: 'This is a map',
            type:'Tile',
            order:1
      },{
            title:'Stand up shot',
            url: 'Screen-Shot-2015-06-12-at-100210-AM.png',
            caption:'Troll face stand up ',
            description: 'This guy might do stand up',
            type:'Tile',
            order:2
      },{
            title:'Little Spoon',
            url: 'LittleSpoon.png',
            caption:'Little Spoon Sketch Comedy',
            description: 'Aw, how cute',
            type:'Tile',
            order:3
      }]
    }, function(err, projecturl){
      console.log(err || 'created' + projecturl);
    });
    userService.createUser({username:config.adminusername,password:config.adminpassword}, function(error, response){
      if(error){
        console.error(error);
      }
    });

  }).error(function(err){
    console.log(err);
  });
}

app.set('views','./src/views');
app.set('view engine', 'ejs');

var adminController = require('./src/controllers/adminController')(siteConfigService, projectService, photoService);
var adminRouter = require('./src/routes/adminRoutes')(adminController, photoUpload);
app.use('/admin', adminRouter);

var projectController = require('./src/controllers/projectController')(projectService);
var projectRouter = require('./src/routes/projectRoutes')(projectController);
app.use('/projects', projectRouter);

app.get('/', function(req, res){
  projectService.getFeaturedProjects(function(err, projects){
    if(projects){
      res.render('index', {projects: projects});
    }
  });
});

app.get('/login', function(req, res){
  res.render('login');
});

app.route('/signIn')
    .post(passport.authenticate('local', {
      failureRedirect:'/login'
    }), function(req, res){
      res.redirect('/admin/portal');
    });

app.listen(port, function(err){
  console.log('running on port' + port);
});