var express = require('express'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
port = process.env.PORT || 8080,
route = require('./config/api.js'),
colors = require('colors'),
app = express();

app.set('view engine', 'jade');
app.use('/', route);
app.locals.production = app.get('port') == 80;
app.use('/', express.static(__dirname + '/public/'));
app.use('/public/css', express.static(__dirname + '/bower_components/bootstrap/dist/css/'));
// app.use('/public/js', express.static(__dirname + '/public/js'));

app.use(bodyParser.urlencoded({
  extended: 'true'
}));
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.listen(port, function() {
  console.log(colors.rainbow('Listening on port ' +  port));
});
