var SCHEDULE_API = require('./schedule.js');
var getWeeks = require('./getWeeks.js');
var lunch = require('./lunch.js');
var special = require('./special.js');
var announcement = require('./announcement.js');
var CronJob = require('cron').CronJob;

module.exports.home = function(req, res) {
  // if (req.user) {
  res.render('manage', {production: req.app.locals.production, upper: true});
  // } else {
  // res.redirect('/manage/authenticate')
  // }
};

module.exports.upload = function(req, res) {
  var date = new Date(req.body.date);
  var file = req.files;
  if (file == {}) {
    return res.redirect('/manage?error=upload');
  }
  console.log(file);
  // if (req.user) {
  res.render('manage', {production: req.app.locals.production, upper: true});
  // } else {
  // res.redirect('/manage/authenticate')
  // }
};
