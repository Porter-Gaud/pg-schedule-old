var express = require('express'),
  http = require('http'),
  API = require('./schedule.js'),
  MS_API = require('./middleSchedule.js'),
  HELP_API = require('./help.js'),
  router = express.Router(),
  year = 2015,
  getWeeks = require('./getWeeks.js');

router.get('/', function(req, res) {
  res.render('index.jade', {production: req.app.locals.production});
});

router.get('/api/', function(req, res) {
  res.json(HELP_API);
});
router.get('/api/schedule/', function(req, res) {
  if (req.query.middle === null) {
    res.json(API);
  } else {
    req.json(MS_API);
  }
});

router.get('/api/timeUntil/', function(req, res) {
  var todayDate = new Date();
  var today = getDayObject(todayDate, getWeeks.currentWeek(), (req.query.middle !== null));
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
  var today = getDayObject(todayDate, getWeeks.currentWeek(), (req.query.middle !== null));
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
  console.log(req.query.middle);
  var today = new Date();
  res.json(getDayObject(today, getWeeks.currentWeek(), (req.query.middle !== null)));
});

router.get('/api/getFutureDate/:month/:date/', function(req, res) {
  var theWeek = getWeeks.getFutureWeek(req.query.middle !== null);
  theDay = new Date(year, req.params.month, req.params.date);
  res.json(getDayObject(theDay, theWeek, req.query.middle !== null));
});

function getDayObject(date, week, middle) {
  if (date.getDay() === 0 || date.getDay() == 6) {
    return '';
  }

  var index = date.getDay() - 1;
  if (week === 'B') {
    index += 5;
  }
  console.log(middle);
  return middle ? MS_API.days[index] : API.days[index];
}

module.exports = router;
