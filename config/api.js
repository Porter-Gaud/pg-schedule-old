var express = require('express'),
  http = require('http'),
  API = require('./schedule.js'),
  HELP_API = require('./help.js'),
  router = express.Router(),
  year = 2015,
  getWeeks = require('./getWeeks.js'),
  app = express();

router.get('/', function(req, res) {
  res.render('index.jade');
});

router.get('/api/', function(req, res) {
  res.json(HELP_API);
});
router.get('/api/schedule/', function(req, res) {
  res.json(API);
});
router.get('/api/middleSchedule/', function(req, res) {
  res.json(API);
});

router.get('/api/timeUntil/', function(req, res) {
  var todayDate = new Date();
  var today = getDayObject(todayDate, getWeeks.currentWeek());
  if (today === '') {
    res.json('');
    return;
  }
  var now = new Date();
  for (var key in today.day) {
    var day = today.day[key];

    var startTime = day['start-time'];
    var endTime = day['end-time'];
    var startDate = new Date();
    startDate.setHours(startTime.split(':')[0]);
    startDate.setMinutes(startTime.split(':')[1]);
    startDate.setSeconds(0);

    var endDate = new Date();
    endDate.setHours(endTime.split(':')[0]);
    endDate.setMinutes(endTime.split(':')[1]);
    endDate.setSeconds(0);
    if ((now <= endDate && now >= startDate)) {
      return Math.round((endDate.getTime() - now.getTime()) / 60000);
    }
  }
  res.json(-1);
});

router.get('/api/currentBlock/', function(req, res) {
  var todayDate = new Date();
  var today = getDayObject(todayDate, getWeeks.currentWeek());
  if (today === '') {
    res.json('');
    return;
  }
  var now = new Date();
  for (var key in today.day) {
    var day = today.day[key];

    var startTime = day['start-time'];
    var endTime = day['end-time'];

    var startDate = new Date();
    startDate.setHours(startTime.split(':')[0]);
    startDate.setMinutes(startTime.split(':')[1]);
    startDate.setSeconds(0);

    var endDate = new Date();
    endDate.setHours(endTime.split(':')[0]);
    endDate.setMinutes(endTime.split(':')[1]);
    endDate.setSeconds(0);
    if ((now <= endDate && now >= startDate)) {
      res.json(day.name);
      return;
    }
  }
  res.json('');
});

router.get('/api/currentDay/', function(req, res) {
  var today = new Date();
  res.json(getDayObject(today, getWeeks.currentWeek()));
});

router.get('/api/getFutureDate/:month/:date', function(req, res) {
  var theWeek = getWeeks.getFutureWeek(),
  theDay = new Date(year, req.params.month, req.params.date);
  res.json(getDayObject(theDay, theWeek));
});

function getDayObject(date, week) {
  if (date.getDay() === 0 || date.getDay() == 6) {
    return '';
  }

  var index = date.getDay() - 1;
  if (week === 'B') {
    index += 5;
  }
  return API.days[index];
}

module.exports = router;
