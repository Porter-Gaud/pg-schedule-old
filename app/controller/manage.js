var special = require('../model/special.js');
var announcement = require('../model/announcement.js');
var CronJob = require('cron').CronJob;
var fs = require('fs');

module.exports.home = function(req, res) {
  if (!req.user) {
    return res.redirect('/manage/authenticate');
  }
  res.render('manage', {production: req.app.locals.production, upper: true, status: req.query.status});
};

module.exports.upload = function(req, res) {
  if (!req.user) {
    return res.redirect('/manage/authenticate');
  }
  var date = new Date(req.body.date);
  var dayBeginning = date;
  dayBeginning.setHours(0,0,0,0);
  var file = req.files;
  if (!file.altSchedule) {
    return res.redirect('/manage?status=nofile');
  }

  if (file.altSchedule.mimetype != 'application/pdf') {
    return res.redirect('/manage?status=type');
  }

  fs.writeFile(__dirname + '/../../uploads/' + dayBeginning.getTime() + '.pdf', file.altSchedule.data, function(err) {
    if (err) {
      console.log(err);
      return res.redirect('/manage?status=internal');
    }
    special.special.push(dayBeginning.getTime());
    return res.redirect('/manage?status=success');
  });
};

module.exports.remove = function(req, res) {
  if (!req.user) {
    return res.redirect('/manage/authenticate');
  }
  var date = new Date(req.body.date);
  var dayBeginning = date;
  dayBeginning.setHours(0,0,0,0);
  fs.unlink(__dirname + '/../../uploads/' + dayBeginning.getTime() + '.pdf', function(err) {
    if (err) {
      console.log(err);
      return res.redirect('/manage?status=internal');
    }
    special.special.splice(special.special.indexOf(dayBeginning.getTime()));
    return res.redirect('/manage?status=rsuccess');
  });
};
