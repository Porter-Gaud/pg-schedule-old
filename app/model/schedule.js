/*
Schedule Data
This is where the data that makes everything work is.

------------
Helpful Hint:
If you are tasked with the pain that is making *major* updates to this file, I recommend following to make it at least slightly easier:
1. Pick the first item in the rotation array (this will be used as a template for the rest of the days)
2. Create a new file in a text editor that supports JSON formatting (i.e. Atom)
3. Use a javascript 'beautifier' so you can see what is going on (Google pulls up http://jsbeautifier.org/, which worked for me)
4. Make your changes (remember, 24 hour time so the day ends at 15:15, not 03:15)
5. Re-minify by using CTRL+F and remove all spaces and new lines (\n).
  When using CTRL+F to replace, usually leaving the Replace With field blank will just remove it.
  You may have to turn on the Regex option for new lines to work (top right of Find popup button that says '.*' in Atom)
  If you really want to be cool, the Regex expression [\n\r\s]+ will minify it in one swoop!
  And if you have multiple days in the beautified file, [\n\r\s]+(?!}, {\n\s+'day') will ignore removing new lines that are due to multiple days (Regex is cool!)
6. Remove all other days from the array (save a block day in a new file)
7. Use the Monday blueprint to make all non-block days, use copy paste.
8. Using the saved block day (if those are even still a thing when you are reading this), repeat steps 2-7 for block days
9. Check your work using the actual website, and then get a school administrator to check it as well

If you are doing anything besides just changing a class (if Lunch moves again, for example), you will probably just want to pull the day into its own file and go from there.
While these steps will work if you don't have too much software development experience, just going off your own instinct for editing this file will probably serve you better.
Again, I am sorry that you have to go through the trouble of updating this.
- Tillson Galloway
------------

*/

module.exports.UPPER = {
  'days': [
    {'day':[{'name':'A','start-time':'08:10','end-time':'08:55'},{'name':'B','start-time':'09:00','end-time':'09:45'},{'name':'C','start-time':'09:50','end-time':'10:35'},{'name':'Community','start-time':'10:35','end-time':'11:15'},{'name':'Break','start-time':'11:15','end-time':'11:20'},{'name':'D','start-time':'11:25','end-time':'12:10'},{'name':'E','start-time':'12:15','end-time':'13:00'},{'name':'Lunch','start-time':'13:00','end-time':'13:35'},{'name':'F','start-time':'13:40','end-time':'14:25'},{'name':'G','start-time':'14:30','end-time':'15:15'}]},
    {'day':[{'name':'B','start-time':'08:10','end-time':'08:55'},{'name':'C','start-time':'09:00','end-time':'09:45'},{'name':'Break','start-time':'09:45','end-time':'9:55'},{'name':'D','start-time':'10:00','end-time':'10:45'},{'name':'Community','start-time':'10:45','end-time':'11:20'},{'name':'E','start-time':'11:25','end-time':'12:10'},{'name':'F','start-time':'12:15','end-time':'13:00'},{'name':'Lunch','start-time':'13:00','end-time':'13:35'},{'name':'G','start-time':'13:40','end-time':'14:25'},{'name':'A','start-time':'14:30','end-time':'15:15'}]},
    {'day':[{'name':'AM Meetings/HR','start-time':'08:00','end-time':'09:05'},{'name':'C','start-time':'09:10','end-time':'10:35'},{'name':'Community','start-time':'10:40','end-time':'11:25'},{'name':'D','start-time':'11:30','end-time':'12:55'},{'name':'Lunch','start-time':'13:00','end-time':'13:45'},{'name':'E','start-time':'13:50','end-time':'15:15'}]},
    {'day':[{'name':'F','start-time':'08:10','end-time':'09:35'},{'name':'Break','start-time':'09:35','end-time':'9:50'},{'name':'G','start-time':'9:50','end-time':'11:15'},{'name':'Break','start-time':'11:15','end-time':'11:30'},{'name':'A','start-time':'11:35','end-time':'13:00'},{'name':'Lunch','start-time':'13:00','end-time':'13:45'},{'name':'B','start-time':'13:50','end-time':'15:15'}]},
    {'day':[{'name':'D','start-time':'08:10','end-time':'08:55'},{'name':'E','start-time':'09:00','end-time':'09:45'},{'name':'F','start-time':'9:50','end-time':'10:35'},{'name':'Community','start-time':'10:35','end-time':'11:20'},{'name':'G','start-time':'11:25','end-time':'12:10'},{'name':'A','start-time':'12:15','end-time':'13:00'},{'name':'Lunch','start-time':'13:00','end-time':'13:35'},{'name':'B','start-time':'13:40','end-time':'14:25'},{'name':'C','start-time':'14:30','end-time':'15:15'}]},
    // B
    {'day':[{'name':'E','start-time':'08:10','end-time':'08:55'},{'name':'F','start-time':'09:00','end-time':'09:45'},{'name':'G','start-time':'09:50','end-time':'10:35'},{'name':'Community','start-time':'10:35','end-time':'11:15'},{'name':'Break','start-time':'11:15','end-time':'11:20'},{'name':'A','start-time':'11:25','end-time':'12:10'},{'name':'B','start-time':'12:15','end-time':'13:00'},{'name':'Lunch','start-time':'13:00','end-time':'13:35'},{'name':'C','start-time':'13:40','end-time':'14:25'},{'name':'D','start-time':'14:30','end-time':'15:15'}]},
    {'day':[{'name':'F','start-time':'08:10','end-time':'08:55'},{'name':'G','start-time':'09:00','end-time':'09:45'},{'name':'Break','start-time':'09:45','end-time':'9:55'},{'name':'A','start-time':'10:00','end-time':'10:45'},{'name':'Community','start-time':'10:45','end-time':'11:20'},{'name':'B','start-time':'11:25','end-time':'12:10'},{'name':'C','start-time':'12:15','end-time':'13:00'},{'name':'Lunch','start-time':'13:00','end-time':'13:35'},{'name':'D','start-time':'13:40','end-time':'14:25'},{'name':'E','start-time':'14:30','end-time':'15:15'}]},
    {'day':[{'name':'AM Meetings/HR','start-time':'08:00','end-time':'09:05'},{'name':'G','start-time':'09:10','end-time':'10:35'},{'name':'Community','start-time':'10:40','end-time':'11:25'},{'name':'A','start-time':'11:30','end-time':'12:55'},{'name':'Lunch','start-time':'13:00','end-time':'13:45'},{'name':'B','start-time':'13:50','end-time':'15:15'}]},
    {'day':[{'name':'C','start-time':'08:10','end-time':'09:35'},{'name':'Break','start-time':'09:35','end-time':'9:50'},{'name':'D','start-time':'9:50','end-time':'11:15'},{'name':'Break','start-time':'11:15','end-time':'11:30'},{'name':'E','start-time':'11:35','end-time':'13:00'},{'name':'Lunch','start-time':'13:00','end-time':'13:45'},{'name':'F','start-time':'13:50','end-time':'15:15'}]},
    {'day':[{'name':'A','start-time':'08:10','end-time':'08:55'},{'name':'B','start-time':'09:00','end-time':'09:45'},{'name':'C','start-time':'9:50','end-time':'10:35'},{'name':'Community','start-time':'10:35','end-time':'11:20'},{'name':'D','start-time':'11:25','end-time':'12:10'},{'name':'E','start-time':'12:15','end-time':'13:00'},{'name':'Lunch','start-time':'13:00','end-time':'13:35'},{'name':'F','start-time':'13:40','end-time':'14:25'},{'name':'G','start-time':'14:30','end-time':'15:15'}]},
  ]
};
module.exports.MIDDLE = {
  'days': [
    {'day':[{'name':'Homeroom','start-time':'08:00','end-time':'08:10'},{'name':'A','start-time':'08:15','end-time':'09:00'},{'name':'B','start-time':'09:05','end-time':'09:50'},{'name':'Community','start-time':'09:50','end-time':'10:15'},{'name':'C','start-time':'10:20','end-time':'11:05'},{'name':'D','start-time':'11:10','end-time':'11:55'},{'name':'Lunch','start-time':'12:00','end-time':'12:45'},{'name':'E','start-time':'12:50','end-time':'13:35'},{'name':'F','start-time':'13:40','end-time':'14:25'},{'name':'G','start-time':'14:30','end-time':'15:15'}]}, // M
    {'day':[{'name':'Homeroom','start-time':'08:00','end-time':'08:10'},{'name':'B','start-time':'08:15','end-time':'09:00'},{'name':'C','start-time':'09:05','end-time':'09:50'},{'name':'Community','start-time':'09:50','end-time':'10:15'},{'name':'D','start-time':'10:20','end-time':'11:05'},{'name':'E','start-time':'11:10','end-time':'11:55'},{'name':'Lunch','start-time':'12:00','end-time':'12:45'},{'name':'F','start-time':'12:50','end-time':'13:35'},{'name':'A','start-time':'13:40','end-time':'14:25'},{'name':'G','start-time':'14:30','end-time':'15:15'}]}, // T
    {'day':[{'name':'Homeroom','start-time':'08:00','end-time':'08:05'},{'name':'Life 101','start-time':'08:10','end-time':'08:55'},{'name':'C','start-time':'09:00','end-time':'10:25'},{'name':'Community','start-time':'10:25','end-time':'11:05'},{'name':'D','start-time':'11:10','end-time':'11:50'},{'name':'Lunch','start-time':'11:55','end-time':'12:55'},{'name':'D','start-time':'13:00','end-time':'13:40'},{'name':'Break','start-time':'13:40','end-time':'13:50'},{'name':'E','start-time':'13:50','end-time':'15:15'}]}, //W [block]
    {'day': [{'name': 'Homeroom','start-time': '08:00', 'end-time': '08:05' }, { 'name': 'F', 'start-time': '08:10', 'end-time': '09:35' }, { 'name': 'Community', 'start-time': '09:35', 'end-time': '09:55' }, { 'name': 'A', 'start-time': '10:00', 'end-time': '11:25' }, { 'name': 'G', 'start-time': '11:30', 'end-time': '12:10' }, { 'name': 'Lunch', 'start-time': '12:15', 'end-time': '12:55' }, { 'name': 'G', 'start-time': '13:00', 'end-time': '13:40' }, { 'name': 'Break', 'start-time': '13:40', 'end-time': '13:50' }, { 'name': 'B', 'start-time': '13:50', 'end-time': '15:15' }] }, //W [block]
    {'day':[{'name':'Homeroom','start-time':'08:00','end-time':'08:10'},{'name':'D','start-time':'08:15','end-time':'09:00'},{'name':'E','start-time':'09:05','end-time':'09:50'},{'name':'Community','start-time':'09:50','end-time':'10:15'},{'name':'F','start-time':'10:20','end-time':'11:05'},{'name':'A','start-time':'11:10','end-time':'11:55'},{'name':'Lunch','start-time':'12:00','end-time':'12:45'},{'name':'B','start-time':'12:50','end-time':'13:35'},{'name':'C','start-time':'13:40','end-time':'14:25'},{'name':'G','start-time':'14:30','end-time':'15:15'}]}  // F
  ]
};
module.exports.HELP = {
  'Help for API': 'This is the API for the Porter-Gaud schedule app located on http://www.example.com/api/',
  '/api/': 'The help page.',
  '/api/schedule/': 'Gives the full listings of times for each of the 10 different days.',
  '/api/timeUntil/': 'The time until next class, based on the server time, which (should be) the same time as school',
  '/api/currentDay/': 'Gives the current day from 0-9 where day A1 is 0, A2 is 1...',
  '/api/currentBlock/': 'Gives the current block (A-G).',
  '/api/getLunchMenu/': 'Returns the day\'s lunch menu.',
  'Middle School': 'Add ?middle to the API request to get the middle school version of the API.',
  'Want an endpoint we don\'t have? Submit a pull request!': 'https://github.com/ireallydontcare/pg-schedule'
};
