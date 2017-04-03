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
    if(!req.body.files){
      req.body.files =[];
      req.body.fileData = {};
    }
    req.body.files.push(file.fieldname);
    var firstPart = file.originalname.substring(0, file.originalname.lastIndexOf('.'));
    var extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    var parsedFileName = firstPart.replace(/( )/g,'-').replace(/[^A-Za-z0-9-]/g, '');
    
    req.body.filename = parsedFileName + extension;
    req.body[file.fieldname] = parsedFileName + extension;
    cb(null, parsedFileName + extension);
  }
});
var photoUpload = multer({storage: storage});
var multiUpload = multer({storage:storage});


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
app.use(session({
  secret:'icdnode',
  resave:false,
  saveUninitialized:true
}));

var models = require('./models/index');

var userService = require('./src/services/userService')(models);
require('./src/authentication/passport')(app, userService);

var siteConfigService = require('./src/services/siteConfigService')(models);
var projectService = require('./src/services/projectService')(models);
var photoService = require('./src/services/photoService')(models);

var menuitems = [
  {url:'/about-me', text:'about me'},
  {url:'/experience', text:'experience'},
  {url:'/', text:'work'}
];

app.use(function(req, res, next){
  siteConfigService.getSiteConfig(function(error, response){
    console.log(response);
    if(response){
      var isUserLoggedIn = (req.user ? true : false);
      
      var socialMediaSites = [
        {iconname:'linkedin', url: response.linkedinurl },
        {iconname:'instagram', url: response.instagramurl },
        {iconname:'twitter', url: response.twitterurl },
        {iconname:'facebook', url: response.facebookurl }
      ];
      if(isUserLoggedIn){
        menuitems.push({url:'/admin/portal',text:'admin'});
      }
      res.locals = {
        conf: response,
        loggedin: isUserLoggedIn,
        menuitems: menuitems,
        socialMediaSites:socialMediaSites
      };
    }
    next();
  });
});


app.set('views','./src/views');
app.set('view engine', 'ejs');

var adminController = require('./src/controllers/adminController')(siteConfigService, projectService, photoService);
var adminRouter = require('./src/routes/adminRoutes')(adminController, photoUpload, multiUpload);
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

app.get('/proj/nonfeatured', 
  projectController.getNonFeaturedProjects);

app.route('/about-me')
  .get(function(req, res){
    res.render('contact');
  });

app.get('/experience', function(req, res){
  res.render('resume');
});

app.listen(port, function(err){
  console.log('running on port' + port);
});