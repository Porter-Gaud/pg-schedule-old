var http = require("http");
module.exports.currentWeek = function() {
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

module.exports.getFutureWeek = function(month, date, year){
	var futureDate = new Date(year, month-1, date),
	data = "",
	week = "";
	var options = {
		host:"http://www.portergaud.edu",
		port:80,
		path:"/page.cfm?p=1346&start="+month+"/"+date+"/"+year+"&period=week",
		method:"GET"
	};
    var request = http.request(options, function(response){
    	response.on("end", function(d){
    		data+=d;
    	});
    	response.on("end", function(){
    		if(data.indexOf("A Week" > -1)){
    			week = "A";
    		} else if(data.indexOf("B Week" > -1)){
    			week = "B";
    		} else {
    			week = "WEEKEND";
    		}
    	});
    });
    request.end();
    console.log(data);
    return [futureDate, week];
}