var express = require('express'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
port = process.env.PORT || 8080,
route = require('./config/api.js'),
colors = require('colors'),
app = express();

app.use('/', route);

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/node_modules/'));
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
