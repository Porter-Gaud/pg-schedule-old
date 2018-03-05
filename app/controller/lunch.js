var http = require('http');
var CronJob = require('cron').CronJob;
var menu = '';

module.exports.getMenu = function() {
  // return '{}';
  if (menu !== '') {
    return menu;
  } else {
    return '{}';
    var date = new Date();
    var dateStr = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().substr(2);
    var schedulePageOptions = {
      host: '206.82.192.168',
      port: 80,
      path: '/v2/menu/' + dateStr + '/app/washingtonhall?key=3D895734-2271-4563-8332-AB943B2E9CAF&siteID=538277458587fc0fd60007ac', // uses the iOS app's api key
      method: 'GET'
    };

    var req = http.request(schedulePageOptions, function(res) {
      var data = '';
      res.on('data', function(d) {
        data += d;
      });
      res.on('end', function() {
        try {
          data = JSON.parse(data)['meal periods'];
        } catch (e) {
          return '{}';
        }
        if (!data[0]) {
          return '{}';
        }
        if (data[0].name === 'No Meal Service') {
          data.shift();
        }
        menu = data;
        return menu;
      });
    });
    req.end();
  }
};

module.exports.getMenu();

new CronJob('00 00 * * * 1-5', function() {
  console.log('Automatically updating the lunch menu...');
  menu = '';
  module.exports.getMenu();
}, null, true, 'America/New_York');
