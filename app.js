var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var Sequelize = require('sequelize');

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

db.sync({force:true}).then(function(){
  console.log('db synced');
  console.log(models);
  userService.createUser({username:'icdadmin',password:'admin'}, function(error, response){
    if(error){
      console.error(error);
    }
    console.log(response);
  });

}).error(function(err){
  console.log(err);
});

app.set('views','./src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index',{
    content:'content'
  });
});


app.listen(port, function(err){
  console.log('running on port' + port);
});