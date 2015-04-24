var http = require("http");
module.exports = function() {
	var week = "";
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
	            week = "A";
	        } else if (data.indexOf("B Week") > -1) {
	            week = "B";
	        } else {
	            week = "WEEKEND";
	        }
	    })
  });
  req.end();

  return week;
}

