var http = require('http');
var CronJob = require('cron').CronJob;
var menu = '';

module.exports.getMenu = function() {
  if (menu !== '') {
    return menu;
  } else {
    var schedulePageOptions = {
      host: 'www.myschooldining.com',
      port: 80,
      path: '/api?key=B6EEF83E-7E80-11E1-BAEF-DBA84824019B&siteID=605&locationId=washingtonhall&lib=menus', // uses the iOS app's api key
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

new CronJob('00 03 00 * * *', function() {
  console.log('Automatically updating the lunch menu...');
  menu = '';
  module.exports.getMenu();
}, null, true, 'America/New_York');
