var express = require('express');
var app = express();

var bodyParser = require('body-parser'); // pull information from HTML POST 
var methodOverride = require('method-override');// simulate DELETE and PUT
var port = process.env.PORT || 8080;

app.week = "UNKNOWN";

var route = require("./config/api.js");
app.use("/", route);

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + "/node_modules/"));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.listen(port, function(){
	console.log("Listening on port " +  port);
});