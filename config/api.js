var express = require("express"),
    http = require("http"),
    API = {"days":[{"day":[{"name":"A","start-time":"08:10","end-time":"08:55"},{"name":"B","start-time":"09:00","end-time":"09:45"},{"name":"Break","start-time":"09:45","end-time":"10:00"},{"name":"C","start-time":"10:00","end-time":"10:45"},{"name":"Community","start-time":"10:45","end-time":"11:20"},{"name":"D","start-time":"11:25","end-time":"12:10"},{"name":"E","start-time":"12:15","end-time":"13:00"},{"name":"Lunch","start-time":"13:00","end-time":"13:35"},{"name":"F","start-time":"13:40","end-time":"14:25"},{"name":"G","start-time":"14:30","end-time":"15:15"}]},{"day":[{"name":"B","start-time":"08:10","end-time":"08:55"},{"name":"C","start-time":"09:00","end-time":"09:45"},{"name":"Community","start-time":"09:45","end-time":"10:20"},{"name":"D","start-time":"10:25","end-time":"11:10"},{"name":"Break","start-time":"11:10","end-time":"11:25"},{"name":"E","start-time":"11:25","end-time":"12:10"},{"name":"F","start-time":"12:15","end-time":"13:00"},{"name":"Lunch","start-time":"13:00","end-time":"13:35"},{"name":"G","start-time":"13:40","end-time":"14:25"},{"name":"A","start-time":"14:30","end-time":"15:15"}]},{"day":[{"name":"AM Meetings/HR","start-time":"08:00","end-time":"09:05"},{"name":"C","start-time":"09:10","end-time":"10:35"},{"name":"Community","start-time":"10:40","end-time":"11:25"},{"name":"D","start-time":"11:30","end-time":"12:55"},{"name":"Lunch","start-time":"13:00","end-time":"13:45"},{"name":"E","start-time":"13:50","end-time":"15:15"}]},{"day":[{"name":"G","start-time":"08:10","end-time":"09:35"},{"name":"F","start-time":"09:40","end-time":"11:05"},{"name":"Community","start-time":"11:05","end-time":"11:35"},{"name":"A","start-time":"11:40","end-time":"13:05"},{"name":"Lunch","start-time":"13:05","end-time":"13:45"},{"name":"B","start-time":"13:50","end-time":"15:15"}]},{"day":[{"name":"D","start-time":"08:10","end-time":"08:55"},{"name":"E","start-time":"09:00","end-time":"09:45"},{"name":"Break","start-time":"09:45","end-time":"10:00"},{"name":"F","start-time":"10:00","end-time":"10:45"},{"name":"Community","start-time":"10:45","end-time":"11:20"},{"name":"G","start-time":"11:25","end-time":"12:10"},{"name":"Lunch","start-time":"12:10","end-time":"12:45"},{"name":"A","start-time":"12:50","end-time":"13:35"},{"name":"B","start-time":"13:40","end-time":"14:25"},{"name":"C","start-time":"14:30","end-time":"15:15"}]},{"day":[{"name":"E","start-time":"08:10","end-time":"08:55"},{"name":"F","start-time":"09:00","end-time":"09:45"},{"name":"Break","start-time":"09:45","end-time":"10:00"},{"name":"G","start-time":"10:00","end-time":"10:45"},{"name":"Community","start-time":"10:45","end-time":"11:20"},{"name":"A","start-time":"11:25","end-time":"12:10"},{"name":"Lunch","start-time":"12:10","end-time":"12:45"},{"name":"B","start-time":"12:50","end-time":"13:35"},{"name":"C","start-time":"13:40","end-time":"14:25"},{"name":"D","start-time":"14:30","end-time":"15:15"}]},{"day":[{"name":"F","start-time":"08:10","end-time":"08:55"},{"name":"G","start-time":"09:00","end-time":"09:45"},{"name":"Community","start-time":"09:45","end-time":"10:20"},{"name":"A","start-time":"10:25","end-time":"11:10"},{"name":"Break","start-time":"11:10","end-time":"11:25"},{"name":"B","start-time":"11:25","end-time":"12:10"},{"name":"Lunch","start-time":"12:10","end-time":"12:45"},{"name":"C","start-time":"12:50","end-time":"13:35"},{"name":"D","start-time":"13:40","end-time":"14:25"},{"name":"E","start-time":"14:30","end-time":"15:15"}]},{"day":[{"name":"AM Meetings/HR","start-time":"08:00","end-time":"09:05"},{"name":"A","start-time":"09:10","end-time":"10:35"},{"name":"Community","start-time":"10:40","end-time":"11:25"},{"name":"B","start-time":"11:30","end-time":"12:55"},{"name":"Lunch","start-time":"13:00","end-time":"13:45"},{"name":"G","start-time":"13:50","end-time":"15:15"}]},{"day":[{"name":"C","start-time":"08:10","end-time":"09:35"},{"name":"F","start-time":"09:40","end-time":"11:05"},{"name":"Community","start-time":"11:05","end-time":"11:35"},{"name":"E","start-time":"11:40","end-time":"13:05"},{"name":"Lunch","start-time":"13:05","end-time":"13:45"},{"name":"D","start-time":"13:50","end-time":"15:15"}]},{"day":[{"name":"G","start-time":"08:10","end-time":"08:55"},{"name":"A","start-time":"09:00","end-time":"09:45"},{"name":"Break","start-time":"09:45","end-time":"10:00"},{"name":"B","start-time":"10:00","end-time":"10:45"},{"name":"Community","start-time":"10:45","end-time":"11:20"},{"name":"C","start-time":"11:25","end-time":"12:10"},{"name":"D","start-time":"12:15","end-time":"13:00"},{"name":"Lunch","start-time":"13:00","end-time":"13:35"},{"name":"E","start-time":"13:40","end-time":"14:25"},{"name":"F","start-time":"14:30","end-time":"15:15"}]}]},
    HELP_API = {"Help for API":"This is the API for the Porter-Gaud schedule app located on http://www.example.com/api/","/api/":"The help page.","/api/schedule/":"Gives the full listings of times for each of the 10 different days.","/api/timeUntil":"The time until next class, based on the server time, which (should be) the same time as school","/api/currentDay":"Gives the current day from 0-9 where day A1 is 0, A2 is 1...", "/api/currentBlock":"Gives the current block (A-G)."},
    router = express.Router(),
    year = 2015,
    getWeeks = require("./getWeeks.js");

router.get("/", function (req, res) {
    res.sendFile("index.html", {
        "root": __dirname + "./../views/"
    });
    console.log("New Visitor".rainbow);
});

router.get("/api/", function (req, res) {
    res.json(HELP_API);
});
router.get("/api/schedule/", function (req, res) {
    res.json(API);
});

router.get("/api/timeUntil/", function (req, res) {
    var todayDate = new Date();
    var today = getDayObject(todayDate, getWeeks.currentWeek());
    if (today === "") {
        res.json("");
        return;
    }
    var now = new Date();
    for (var key in today.day) {
        var day = today.day[key];

        var startTime = day["start-time"];
        var endTime = day["end-time"];
        var startDate = new Date();
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(0);

        var endDate = new Date();
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(0);
        if ((now <= endDate && now >= startDate)) {
            res.json(Math.floor((((endDate.getTime() - now.getTime())) % 86400000) % 3600000 / 60000));
            return;
        }
    }
    res.json(-1);
});

router.get("/api/currentBlock/", function (req, res) {
    var todayDate = new Date();
    var today = getDayObject(todayDate, getWeeks.currentWeek());
    if (today === "") {
        res.json("");
        return;
    }
    var now = new Date();
    for (var key in today.day) {
        var day = today.day[key];

        var startTime = day["start-time"];
        var endTime = day["end-time"];

        var startDate = new Date();
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(0);

        var endDate = new Date();
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(0);
        if ((now <= endDate && now >= startDate)) {
            res.json(day["name"]);
            return;
        }
    }
    res.json(-1);
});

router.get("/api/currentDay/", function (req, res) {
    var today = new Date();
    res.json(getDayObject(today, getWeeks.currentWeek()));
});

router.get("/api/getFutureDate/:month/:date", function(req, res){
    var theWeek = getWeeks.getFutureWeek(),
    theDay = new Date(year, req.params.month, req.params.date);
    res.json(getDayObject(theDay, theWeek));
});

//This needs to be a seperate function because two of the routes get it.
function getDayObject(date, week){
    // console.log(date + " " + week);
    if (date.getDay() == 0 || date.getDay() == 6) {
        return "";
    }

    var index = date.getDay() - 1;
    if (week === "B")
        index += 5;
    return API["days"][index];
}

module.exports = router;
