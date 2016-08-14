var express = require('express'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
port = process.env.PORT || 8080,
route = require('./app/routes/route.js'),
colors = require('colors'),
app = express(),
passport = require('passport'),
cookieParser = require('cookie-parser'),
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
session = require('express-session'),
Sequelize = require('sequelize');

app.set('view engine', 'jade');
app.set('views', './app/views');
var sequelize = new Sequelize(process.env.PG_POSTGRES_STRING,
  {logging: false, ssl: true, dialectOptions: {ssl: true}});
var User = sequelize.import(__dirname + '/models/User.js');
var Schedule = sequelize.import(__dirname + '/models/Schedule.js');

var passportConfig = require(__dirname + '/config/passport.js')(passport, GoogleStrategy, User);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
// Cookie for session IDs. Cookie names are random
var cookieSession = require('cookie-session');
app.use(cookieSession({keys: ['aja420', 'asldkjf234']}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.locals.production = (port == process.env.PORT);

app.use('/', express.static(__dirname + '/public/'));
app.use('/fonts', express.static(__dirname + '/bower_components/bootstrap/fonts/'));
app.use('/', route);
app.use('/', require('./app/routes/googleauth.js'));

app.listen(port, function() {
  console.log(colors.rainbow('Listening on port ' +  port));
});
