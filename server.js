var express = require('express');
var app = express();

var morgan = require('morgan'); // log requests to the console
var http = require('http');
var bodyParser = require('body-parser'); // pull information from HTML POST 
var methodOverride = require('method-override');// simulate DELETE and PUT
var CronJob = require('cron').CronJob;
var routes = require("./config/routes.js");
var port = process.env.PORT || 8080;

app.week = "UNKNOWN";

require("./config/api.js")(express, http, port);
require("./config/routes.js")(express);

function setupWeek() {
    var schedulePageOptions = {
      host: "www.portergaud.edu",
      port: 80,
      path: '/page.cfm?p=1430',
      method: 'GET'
    };

    var req = http.request(schedulePageOptions, function(res) {
	    var data = ""
	    res.on('data', function(d) {
	        data += d;
	    });
	    res.on("end", function() {
	        if (data.indexOf("A Week") > -1) {
	            app.week = "A";
	        } else if (data.indexOf("B Week") > -1) {
	            app.week = "B";
	        } else {
	            app.week = "WEEKEND";
	        }
	    })
  });
  req.end();
}

setupWeek();
new CronJob('00 01 00 * * 1-6', function(){ // 00:01:00 every-day every-month monday-saturday
    console.log("Updating the current week.");
    setupWeek();
}, null, true, "America/Los_Angeles");

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + "/node_modules/"));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.listen(port);
console.log("App listening on port " + port);