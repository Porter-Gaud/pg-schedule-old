# Porter-Gaud Schedule App (written in Node)
Also on http://pg-schedule.herokuapp.com/

##Current Problems
1. ~~The app.week doesn't go across to the routing file (api.js)~~
2. Bad JSON parsing makes the timeUntil stop working.

##Fixes
1. This is a little less efficent, but I made a function that will get the current week whenever it is called instead of having a CronJob do it.