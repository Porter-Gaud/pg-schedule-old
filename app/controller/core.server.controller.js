var SCHEDULE_API = require('./schedule.js');
var getWeeks = require('./getWeeks.js');
var lunch = require('./lunch.js');

module.exports.home = function(req, res) {
  res.render('index', {production: req.app.locals.production, upper: true});
};

module.exports.middle = function(req, res) {
  res.render('index', {production: req.app.locals.production, upper: false});
};

module.exports.lunch = function(req, res) {
  res.render('lunch', {production: req.app.locals.production});
};

module.exports.exposeAPI = function(req, res) {
  res.json(SCHEDULE_API.HELP);
};

module.exports.api = function(req, res) {
  if (req.query.middle !== null) {
    res.json(SCHEDULE_API.MIDDLE);
  } else if (req.query.upper !== null) {
    res.json(SCHEDULE_API.UPPER);
  } else {
    res.json(SCHEDULE_API.HELP);
  }
};

module.exports.timeUntil = function(req, res) {
  var todayDate = new Date();
  var today = getDayObject(todayDate, getWeeks.currentWeek(), req.query.middle);
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
      res.json(Math.round((endDate.getTime() - now.getTime()) / 60000));
    }
  }
};

module.exports.currentBlock = function(req, res) {
  var todayDate = new Date();
  var today = getDayObject(todayDate, getWeeks.currentWeek(), req.query.middle);
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
};

module.exports.currentDay = function(req, res) {
  var today = new Date();
  var response = {};
  if (getWeeks.currentWeek() == null) {
    res.json('');
  } else {
    response[getWeeks.currentWeek()] = getDayObject(today, getWeeks.currentWeek(), req.query.middle);
    res.json(response);
  }
};

module.exports.getFutureWeek = function(req, res) {
  theDay = new Date(req.params.year, req.params.month, req.params.date);
  var theWeek = getWeeks.getFutureWeek(theDay);
  var response = {};
  response[theWeek] = getDayObject(theDay, theWeek, req.query.middle);
  res.json(response);
};

module.exports.getLunch = function(req, res) {
  res.json(lunch.getMenu());
};

function getDayObject(date, week, middle) {
  if (!middle) {
    middle = false;
  }
  if (date.getDay() === 0 || date.getDay() == 6) {
    return '';
  }
  var index = date.getDay() - 1;
  if (week === 'B') {
    index += 5;
  }
  return (middle) ? SCHEDULE_API.MIDDLE.days[index] : SCHEDULE_API.UPPER.days[index];
}
