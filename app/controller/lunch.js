var https = require('https');
var CronJob = require('cron').CronJob;
var menu = '';

module.exports.getMenu = function() {

  if (menu !== '') {
    console.log("menu returned without update");
    return menu;
  }

  var date = new Date();
  var dateStr = (date.getFullYear().toString() + '/' + date.getDate() + '/' + (date.getMonth() + 1));
  var dateDash = (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
    
    var req = https.get('https://portergaudschool.flikisdining.com/menu/api/weeks/school/porter-gaud-school/menu-type/lunch/' + dateStr + '/?format=json', function(res) {
      var data = '';
      var dayData = '';
      res.on('data', function(d) {
        data += d;
      });
      res.on('end', function() {
        try {
          data = JSON.parse(data);
          for (var day = 0; day < data.days.length; day++) {
            if (data.days[day].date == dateDash) {
              dayData = data.days[day].menu_items;
            }
          }
        } catch (e) {
          console.warn(e);
          return '{}';
        }
        menu = dayData;
        return menu;
      });
    });
    req.end();






  // var date = new Date();
  // var dateStr = (date.getFullYear().toString() + '/' + date.getDate() + '/' + (date.getMonth() + 1));
  // var dateDash = (date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))

  // https.request('https://portergaudschool.flikisdining.com/menu/api/weeks/school/porter-gaud-school/menu-type/lunch/' + dateStr + '/?format=json', (resp) => {
  // let data = '';

  // // A chunk of data has been recieved.
  // resp.on('data', (chunk) => {
  //   data += chunk;
  // });

  // // The whole response has been received. Print out the result.
  // resp.on('end', function() {
  //   //console.log(data);
  //   return {name: "cheese"};
  //   data = JSON.parse(data);
  //   for (var day = 0; day < data.days.length; day++) {
  //     if (data.days[day].date == dateDash) {
  //       //console.log(data.days[day].menu_items);
  //       return data.days[day].menu_items;
  //       //console.log("data says: " +  + "is equal to " + dateDash);
  //     }
  //   }
  // });

  // }).on("error", (err) => {
  //   console.log("Error: " + err.message);
  // });

  // if (menu !== '') {
  //   console.log("menu returned without update");
  //   return menu;
  // } else {
  //   var date = new Date();
  //   var dateStr = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().substr(2);
  //   var schedulePageOptions = {
  //     host: 'portergaudschool.flikisdining.com',
  //     port: 443,
  //     path: '/menu/api/weeks/school/porter-gaud-school/menu-type/lunch/2019/08/28/?format=json', // uses the iOS app's api key
  //     method: 'GET'
  //   };
    
  //   var req = http.request(schedulePageOptions, function(res) {
  //     console.log(req);
  //     var data = '';
  //     res.on('data', function(d) {
  //       console.log("d: " + d);
  //       data += d;
  //     });
  //     res.on('end', function() {
  //       console.log(data);
  //       try {
  //         data = JSON.parse(data);
  //         console.log(data);
  //       } catch (e) {
  //         console.log(e);
  //         return '{}';
  //       }
  //       if (!data[0]) {
  //         console.log("issue with API parse");
  //         return '{}';
  //       }
  //       if (data[0].name === 'No Meal Service') {
  //         console.log("no stuff there.");
  //         data.shift();
  //       }
  //       menu = data;
  //       return menu;
  //     });
  //   });
  //   req.end();
  // }
};

module.exports.getMenu();

new CronJob('00 00 * * * 1-5', function() {
  console.log('Automatically updating the lunch menu...');
  menu = '';
  module.exports.getMenu();
}, null, true, 'America/New_York');
