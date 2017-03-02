var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var Sequelize = require('sequelize');
var multer = require('multer');


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


var db = new Sequelize('icd_design_db', 'icdadmin','icd17Design!', {
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

db.sync({force:true}).then(function(){
  console.log('db synced');
  //console.log(models);
  models.SiteConfiguration.create({
    logourl:'photo.jpg',
    logoalttext:'site logo',
    introtext:'welcome to this site',
    sitetitle:'Site Title',
    contactemail:'me@thisdomain.com'
  });
  userService.createUser({username:'icdadmin',password:'admin'}, function(error, response){
    if(error){
      console.error(error);
    }
  });

}).error(function(err){
  console.log(err);
});

app.set('views','./src/views');
app.set('view engine', 'ejs');

var adminController = require('./src/controllers/adminController')(siteConfigService);
var adminRouter = require('./src/routes/adminRoutes')(adminController, photoUpload);

app.use('/admin', adminRouter);

app.get('/', function(req, res){
  // siteConfigService.getSiteConfig(function(err, conf){
  //   console.log(conf);
    res.render('index');
  // });
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