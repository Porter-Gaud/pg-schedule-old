var https = require('https');
var CronJob = require('cron').CronJob;

var currentWeek = 'UNKNOWN';

module.exports.currentWeek = function() {
  if (currentWeek != 'UNKNOWN') {
    return currentWeek;
  } else {
    console.log('currentWeek ' + currentWeek);
    var week = '';
    var schedulePageOptions = {
      host: 'www.portergaud.edu',
      port: 443,
      path: '/page.cfm?p=1346&period=week',
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
      }
    };
    var req = https.request(schedulePageOptions, function(res) {
      var data = '';
      res.on('data', function(d) {
        data += d;
      });
      res.on('end', function() {
        data = data.toLowerCase();
        if (data.indexOf('a week') > -1 || data.indexOf('week a') > -1) {
          week = 'A';
        } else if (data.indexOf('b week') > -1 || data.indexOf('week b') > -1) {
          week = 'B';
        } else {
          week = 'WEEKEND';
        }
        currentWeek = week;
        return week;
      });
    });
    req.end();
  }
};

module.exports.currentWeek();

new CronJob('00 01 00 * * *', function() {
  console.log('Automatically updating the week...');
  currentWeek = 'UNKNOWN';
  module.exports.currentWeek();
}, null, true, 'America/New_York');

module.exports.getFutureWeek = function(day) {
  if (day.getDay() === 0 || day.getDay() === 6) {
    return ''; // will be implemented closer to 2017
  }
  return (day.getWeek() % 2 === 1) ? 'A' : 'B';
  // var week = '';
  // console.log('http://www.portergaud.edu/page.cfm?p=1346&start=' + month + '/' + date + '/' + year + '&period=week');
  // var request = http.get('http://www.portergaud.edu/page.cfm?p=1346&start=' + month + '/' + date + '/' + year + '&period=week', function(response) {
  //   var data = '';
  //   response.on('end', function(d) {
  //     data += d;
  //   });
  //   response.on('end', function() {
  //     if (data.indexOf('A Week' > -1) || data.indexOf('Week A' > -1)) {
  //       week = 'A';
  //     } else if (data.indexOf('B Week' > -1) || data.indexOf('Week B' > -1)) {
  //       week = 'B';
  //     } else {
  //       week = 'WEEKEND';
  //     }
  //     console.log(week);
  //     return week;
  //   });
  // });
};

Date.prototype.getWeek = function() {
  var d = new Date(+this);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};
