# Porter-Gaud Schedule App (written in Node)
Also on http://pg-schedule.herokuapp.com/


###Looking to the future
* Getting a specific date

###Current Problems
1. ~~The app.week doesn't go across to the routing file (api.js)~~
2. ~~Bad JSON parsing makes the timeUntil stop working.~~
3. ~~Angular.js not getting all classes from the currentDay http GET.~~

###Fixes
1. This is a little less efficent, but I made a function that will get the current week whenever it is called instead of having a CronJob do it.
2. It seems to be working, and I had to make a function in the API.js file that got the current week so that I could refrence it in the timeUntil api
3. Meh, IDK. I just fixed it.