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

var models = require('./src/models/models')(db);

db.sync({force:true}).then(function(){
  console.log('db synced');
  console.log(models)
  models.User.create({username:'icdadmin',passwordhash:'admin'}).then(function(response){
    console.log(response);
  }).error(function(error){
    console.log('Could not create user. Error: ' + error);
  });

}).error(function(err){
  console.log(err);
});
var app = express();

var port = process.env.PORT || 5000;


//app set up
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:'icdnode'}));

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