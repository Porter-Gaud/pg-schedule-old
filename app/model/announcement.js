/*
Announcement Data
Announcements display at the top of the main schedule page.

Eventually, this should be done via Manage, but for now, it's hard-coded.
We currently only support one announcement at a time.
To show an announcement, assign module.exports to an object that conforms to the same schema as the following example:
{
  expires: '8/6/2017',
  loads: 1,
  text: 'The text for the announcement.'
}

'expires' is the date at which the app should stop attempting to show the announcement
'loads' is the number of main page loads for an individual user that should occur before the announcement stops showing (this is stored in the announcement cookie')
'text' is the text of the announcement.

*/

module.exports = {
  expires: '8/30/2019',
  loads: 20,
  text: 'Fixed many issues: lunch menu now works. Changing the day now shows the correct week. Announcements works again (kinda). -Charles'
};
