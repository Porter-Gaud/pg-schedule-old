# Porter-Gaud Schedule App
[![Build Status](https://travis-ci.org/ireallydontcare/pg-schedule.svg?branch=master)](https://travis-ci.org/ireallydontcare/pg-schedule)

**Available on http://schedule.portergaud.edu/**

A webapp that keeps track of the [Porter-Gaud](portergaud.edu) Schedule so you don't have to.

# Table of Contents

<!-- toc -->

- [Technical Details](#technical-details)
  * [The Project](#the-project)
    + [Prerequisites](#prerequisites)
    + [The App](#the-app)
      - [Controller](#controller)
        * [Middle School](#middle-school)
        * [Future Weeks](#future-weeks)
          + [Alternate Schedules](#alternate-schedules)
        * [Manage](#manage)
          + [Other Features](#other-features)
      - [Model](#model)
      - [Frontend (Views)](#frontend-views)
      - [Routes](#routes)
  * [The Database](#the-database)
      - [Developing with the database enabled](#developing-with-the-database-enabled)
  * [Where is this hosted?](#where-is-this-hosted)
- [Contributing](#contributing)
      - [For Large Changes](#for-large-changes)
    + [Testing](#testing)
    + [Troubleshooting](#troubleshooting)
  * [A Message from the Project Team](#a-message-from-the-project-team)
  * [PG-Schedule Project Team](#pg-schedule-project-team)
    + [Former Members](#former-members)

<!-- tocstop -->

# Technical Details
## The Project
The PG-Schedule app is written in NodeJS, with [Express](https://expressjs.com/) as the web framework, using [Pug](https://pugjs.org) (formerly Jade) as the template engine (instead of HTML).  Authentication for the Manage administrative portal is done through [PostgreSQL](https://www.postgresql.org/) and the Google OAuth Authentication API, with Passport as Express middleware.

### Prerequisites
In order to effectively contribute to this project, you as the contributor should familiarize yourself with [basic command line knowledge](https://www.codecademy.com/learn/learn-the-command-line). While you don't have to be an expert, you should at the very least be able to traverse through your computer's files solely on the command line.
It is also recommended that that you gain some knowledge of JavaScript (Node is all JavaScript) and potentially AngularJS if you wish to work heavily on the frontend.  Tutorials for both are available for free on [Codecademy](https://www.codecademy.com/).
Though it is not essential, we highly recommend additionally familiarizing yourself with Git, which is how we manage the code.  The contribution guide below will walk you through how to contribute to the project using Git, but having basic knowledge of Git branches will increase your understanding of what is going on "under the hood."

Before starting, you also may want to run the following to set up some global npm modules:
`npm install grunt nodemon --global`

### The App
The code that powers PG-Schedule (in the `/app/` directory) contains three sections and holds the logic for generating the schedule:

#### Controller
Code in `/app/controller` pulls data from either a webservice (in the case of the lunch menu), or from the model and sends the view code (`/app/view`) the data it should display on the webpage

For example, the raw schedule data lives in `/app/model/schedule.js` and is pulled by the controller in `/app/controller/core.server.controller.js`, where only the schedule for the day requested by the view (e.g. 8/29/2017, a B week Tuesday) is sent to the view along along with the current day, week, and block.
A special schedule PDF uploaded by a user in Manage will override the schedule for the day.

*Hint: The system of separating the data, the frontend, and the controller code that links them is a very common style of creating apps known as Model-View-Controller, or [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), and is worth a look into if you are interested in software development (especially mobile development).  The next sections of this README will talk about the Model and View aspects of the app.*

##### Middle School
PG-Schedule contains data for both Upper and Middle School (stored in the model directory- more information on the specifics below).  As of the 2017-18 school year, Middle School no longer has A/B weeks, so internally, all middle school weeks are referenced as A weeks.

##### Future Weeks
The app figures out what week it currently is (A/B) from the portergaud.edu calendar.  Using a cron task set to run daily, it pulls the official list of events for the day and searches for a reference to the current week (i.e. the string 'A Week' or 'Week A' for A weeks).  If unable to find this (due to administrator error), the app defaults to an A week.
For future dates, the app uses whether the week is even or odd (which is an A week/B week is set in the code) in an attempt to "guess" the week.
In the future, this is something that can be improved as extended breaks (i.e. Spring Break) "throws off" the algorithm and requires manual intervention.

###### Alternate Schedules
When an alternate schedule is uploaded, the timestamp (time in the Unix epoch, a.k.a. seconds since 1 January 1970) from midnight of the specific day is recorded, and a PDF file named after the timestamp is created in the `/uploads` directory (e.g. `/uploads/1503374400000.pdf` would be an alternate schedule for the day 22 August 2017.)  When the app initially starts, it reads the list of files in the `/uploads` directory and attaches each one to the date.  When a schedule for the date is called, the controller will return a special object with `{ "week": { special: true, date: 1503374400000 } }` as the API output.  The Angular view knows that when it sees this, load a frame of the PDF instead of the original daily schedule.
In the future, the file storage will be moved to some form of off-site storage (S3?) for better persistance across reboots (a caveat of using Heroku).

##### Manage
Manage is mainly designed to be a way for administrators at Porter-Gaud to upload alternate schedules.  Manage has its own view and controller.

###### Other Features
Eventually, Manage will have a way to upload announcements to the schedule, a better way to control access/permissions to Manage, and a way to fix the infamous Spring Break future date issue.  **Feel free to contribute any of these features as a pull request!**

#### Model
Code in `/app/model` is model code, or code that either defines a schema for data or contains raw data.
`announcement.js` and `schedule.js` both contain raw data that is loaded into the app from source (announcements to show on the main page, the core template code for the schedule rotation).
`User.js` contains a schema for PostgreSQL to conform to for handling Manage users.  
`special.js` contains a blank array for storing alternate schedule data, which is loaded at the runtime.

Each file here contains a comment with specific information about the schema and steps to modify the data in the case of `schedule.js`.

#### Frontend (Views)
The frontend code is divided into views (the Pug code) and "public" assets (javascript and css).
Views are under `/app/views/`, and JavaScript is under `/public/js/`.
The frontend view code is written in Pug with AngularJS. Pug allows for the server to pass information to the page when it is loaded (i.e. middle or upper school schedule).  AngularJS handles gathering all of the schedule data (what day it is, schedule for that day, time until next class, etc.) and rendering it on the schedule table.
Ideally, in the future, Pug should not be sending any information to be rendered (not much is currently sent this way), and Angular.js API calls should handle all of it.

*Frontend Note: Any files that contain "all" or ".min." in their file names should not be directly edited, as they are just minified versions of the actual raw JavaScript/CSS files.  Any changes made in these files will be overwriten by the grunt command.*

#### Routes
Express uses a system of routing to pull up the intended page when a user enters the URL in.  Files in the `/app/routes` folder connect the API routes (e.g. http://schedule.portergaud.edu/api/currentDay) to the the correct controller function that will give the data in JSON format that the view can then read.  Routing for static files, (js, css, uploads, etc) is handled in server.js

## The Database
As of Summer 2017, the app now uses a Postgres database to authenticate Manage users with their @portergaud.edu G-Suite accounts and to make login sessions persistent.

If you are in development mode (the default if running locally), this is turned off by default as to not force contributors to know how to set up a PostgreSQL database.

Code directly pertaining to database setup is in the `/config` folder.

#### Developing with the database enabled
If you change something Passport/Postgres/Google Auth related, please ensure that you test the changes in production mode before pushing (the post-push Travis pipeline will do additional testing).
You can set your environment variables to database credentials as specified in server.js in order to connect (if you don't know how to set this up, you may not want to be messing with the database features of the project).
~~~~
PG_USE_DATABASE_DEV # Set this to true to enable the database functionality in development mode.
PG_DATABASE_URL # A full Postgres connection string.
PG_GOOGLE_CLIENT # Google client string.
PG_CLIENT_SECRET # Google secret string
~~~~
Additionally, it is worth noting that the server will decide that is is production if the `PG_PORT` env variable is set to 80.
All environment variables are prefixed with 'PG_' in order to

In order for Google to recognize your local machine as an approved domain for authentication, add the following to the bottom of your computer's `/etc/hosts` file (assuming you are on a *nix system):
`127.0.0.1 schedule.test.portergaud.edu`
This will make the domain schedule.test.portergaud.edu resolve to your local machine.
If using the official Google credentials, this will work immediately.  Otherwise, you will have to set up the OAuth credentials in Google Cloud on your own.

Reminder: Setting up the database is *not a requirement* for contributing to this app.

## Where is this hosted?
The PG-Schedule core application and PostgreSQL instance are hosted on a (free) Heroku server.  This application is live at [schedule.portergaud.edu](http://schedule.portergaud.edu).
The Google Authentication application is hosted on an internal (@portergaud.edu) project on Google Cloud Platform.
This repo is under control of the [Porter-Gaud GitHub organization](https://github.com/porter-gaud), which is open to all Porter-Gaud students.

Access to each of these services can be given on a case-by-case basis by the current project manager(s).

# Contributing
1. **Create a fork** of the repository (if you do not have access to the main repo) This is done through the GitHub project page.

2. **Clone your forked repository.**  This will pull all of the project files from GitHub and will allow for you to run the project and develop on your own computer.  To do this, run `git clone https://github.com/[YOUR_USERNAME]/pg-schedule.git'`.  GitHub will generate this link for you in the green box on your forked repo's homepage.

3. **Create an issue** on the main project repository with a description of the feature/bug fix you would like to implement.  Creating an issue allows for everyone involved in the project to keep track of what contributors are doing, and allows for others to see that a feature that they may have wanted to add is already in progress.

4. **Create a new branch** named after either the corresponding issue.  For example, if I was fixing issue 555, I would use `git checkout -B 555`.

5. **Run `npm install`** to install the project's required modules.  The installation happens within the `node_modules` directory in the project, which is untracked by Git to keep the total size of the repository low.

6. **Make your changes.**  You can use a tool like [nodemon](https://nodemon.io/) to automatically restart the server when changes are made.  We recommend [Atom](https://atom.io/) as a text editor for writing code.  By default, you can access the schedule at http://localhost:8080.  If the port is changed to 80 (the implied port for HTTP websites), the app will assume that is in production mode.

7. **Run `grunt` to start testing.**  Before code is pushed to the production server, a series of tests run on the code to ensure that the code both runs free of syntax errors and that the same code-style is used across the project.  Grunt also "minifies" the JavaScript and CSS into one obfuscated file so it will load faster in the production environment (the role of the `/public/` files that start with 'all'.) We use the [Google JavaScript Style](https://google.github.io/styleguide/jsguide.html) (*do **not** go read that entire guide unless you have absolutely nothing better to do*), without the rules that prevent multiple variables from being declared with one use of the var keyword, and the rule where lines must be under a certain length.
*Tip: you **do not** have to run Grunt each time you make a change, just before committing/pushing.*

8. **Commit your changes.**  This will compile your various changes into what Git calls a "changeset," and additionally will create a single "message" to be sent to GitHub alongside your changes.  This is the message that will be associated with your changes when others look at it, so be descriptive but still succinct. First, tell Git to track your changes with the command `git add --all`.  This tells Git that you have made changes to the project and that it should keep track of those files.  Then, run `git commit -M "Short description of your changes"` to prepare the changeset for being pushed out. Committing multiple times with small things is encouraged and is even beneficial as it prevents conflicts.  For example, if I were building the Manage panel, I'd break it up into smaller tasks and would commit each step.  My commit history may look something like:
~~~~
git commit -M "Create login form";
git commit -M "Build frontend page";
git commit -M "Add schedule uploader";
git commit -M "Fix broken schedule uploader";
~~~~
Note: `git add --all` and `grunt` would be run between each commit and are left out above for clarity.

9. **Push your changes.** Now that your changes have been made and committed, you can push your changes to your branch live on GitHub.  This is done using `git push origin [your_branch]`.  This takes your local, branched-off changes (replace [your_branch] with the issue branch), and pushes them to "origin", which is what Git calls the version of your code that's live on GitHub.  Like with committing, you can push code to your own repository as much as you want and others will be able to see it (others can even leave comments and test it on their own computers).

9. **Make a pull request.**  This will automatically rerun the grunt testing and will check if your changes can be merged into the main PG-Schedule repository.  If either check fails, GitHub will prompt you to fix the issue before it can be merged into the main branch and deployed.

10. **Wait for approval.**  At this point, your pull request is in the hands of the project team and should be merged within 24 hours.  If not, someone from the project team will leave a comment on your pull request informing you of why it was not merged (and hopefully, will be willing to help fix the issue).  Deployments to the live environment ([schedule.portergaud.edu](http://schedule.portergaud.edu)) are not on any set schedule as the app can go months without any modification, but the live site is (*99.9% of the time*) always fully up-to-date the master branch of the PG-Schedule repo.

*Hint: Being familiar with Git is essential to software development.  GitHub has a quick tutorial on how it works [here](https://try.github.io/levels/1/challenges/1).*

#### For Large Changes
If the main PG-Schedule repository undergoes changes while you are working on your personal copy/branch, it may be worth rebasing (refreshing) your local code with the main repository's code.
Doing this periodically brings any new changes (features, bugfixes, etc.) from the 'real' PG-Schedule app into your local copy.  Doing this periodically also helps to prevent merge conflicts that may arise when merging large changesets.
If on a fork of the repository, the following steps will rebase changes from the main project into your local branch:
~~~~
git commit -M "Ensure all changes are committed before rebasing"
git remote add upstream https://github.com/porter-gaud/pg-schedule.git
git fetch upstream
git checkout master
git rebase upstream/master
~~~~
Now, your master branch is up to date, with the main repo, but your issue branch is still out of date.  The issue branch can be updated with:
~~~~
git rebase [BRANCH-NAME]
~~~~
Replace ``[BRANCH-NAME]`` with your actual issue branch's name.  For example, if I were rebasing into the branch of Issue #555 from Step 4, I would type `git rebase 555`

If you find yourself with a merge conflict anywhere along the way, see the Troubleshooting guide below.

### Testing
The PG-Schedule app has testing setup with Grunt locally, and Travis as a build pipeline.  
Grunt tests and validates two things: correct JavaScript syntax and code-style.  After that, Grunt minifies the JavaScript and CSS into files within the `public/` folder.  Run `grunt` to run this (more information on how grunt integrates into the development process is available in Step 7 above).

After you open a pull request to the main repository on GitHub or push to the repository, the tests will be re-run in the cloud using Travis.

Grunt is configured in `Gruntfile.js`, JSCS is configured in `.jscsrc`, and Travis is configured in `.travis.yml`.

### $(this)
This README is meant to be an extensive document about the app aimed at making contributing to this project as simple as possible.
This section mainly exists to explain that the table of contents is generated using [this](https://www.npmjs.com/package/markdown-toc) npm global module, using the command `markdown-toc -i README.md`.  The updated table of contents is automatically inserted into the README (as denoted by comments).

### Troubleshooting

**When running node, I get an error saying `node: command not found`.**
This means that NodeJS is not installed on your computer.
You can install Node directly from [their website](https://nodejs.org/en/download/package-manager/) for almost every platform under the sun.  If you are on a school laptop, you may have to consult the IT Department as the installation may require administrative access.

**When I run the server, it crashes while asking for environment variables.**
This means you are attempting to run the app in production mode without the database credentials setup.  If you wish to continue developing in production mode (*not recommended!*) you will have to create a PostgreSQL database on your local machine and set up the environment variables in your `~/.bashrc` (or `~/.zshrc` file).  Additionally, running in production will require you to manually run `grunt` after frontend CSS/Javascript changes for them to be moved into the minified files.

**When I try to run the server, it immediately crashes!**
This is a very vague problem, but a few potential fixes for common problems:
1. **Delete the `node_modules/` directory and re-run `npm install`**.  See the next troubleshooting question for more information.
2. **Ensure your version of Node is fairly up to date** by running `node --version`.  The latest version is v8.2.1, while the latest long-term support (LTS) version is 6.11.2.  Either will work.  You can update Node by re-installing it.
3. **Update NPM.**  You can do this with `npm install -g npm`
4. **Google it.**  Someone has most likely had the same problem before at one point, so searching for another instance of it (generally with the top line of the error) can be incredibly beneficial.

**I pulled fresh code from the main repository and now when I run the server it crashes!**
If you suddenly started getting a crash after pulling fresh code, there may have been a new dependency added in the code.  To fix this, run `npm install` to catch your local node_modules folder up with the newest version.

**Grunt keeps failing!**
This likely means that you still have a syntax/formatting error somewhere in the project.  Grunt's output will tell you exactly where the errors are, which should help to track them down and fix them.
If there seems to be an issue with Grunt itself, let a project team member know.

**Merge conflict?**
A merge conflict arises when Git is trying to put together changes from somewhere into somewhere else and the same line of code has been modified.  For example, if Tillson changed the format of the date on the main schedule page to where it says "6 August 2017," but in between the time Tillson last pulled from GitHub and finished the change, Charles changed the date format to "8/6/2017" (for some crazy reason), Tillson would experience a merge conflict as the same original line of code was modified by two different people and has now diverged into two ways.  Git will add a message in the file itself showing Charles' version that is now on the server and Tillson's current, local version, and Tillson can either throw away his changes and take Charles' (unlikely, in this particular scenario), overwrite Charles' with his, or manually put the two together.  Git will not allow for you to continue with a pull/push/merge until the conflicts have been resolved.
The [Atom text editor](https://atom.io/) provides useful tools for resolving conflicts.
One thing that all developers agree on is that merge conflicts really do suck.


**I have a question that wasn't answered!**
You can either use the [GitHub Issues](https://github.com/porter-gaud/pg-schedule/issues) page to ask for help, or you can seek out a member of the project team either in person or via email for help.  They will do their best to help, and hopefully will add the question to this Troubleshooting guide for future contributors.

## A Message from the Project Team
Thanks for reading this far!
No code in this app is "set in stone", from individual features to entire frameworks and there are definitely things that can be improved upon (see the GitHub issues section).  While the size of the project may seem intimidating at first (especially as an app that's core function is so simple), but the app is written to be as extensible as possible.  For example, if you want to write an Apple Watch app or even an Amazon Alexa skill, both are well within reach with the open API of this app.  Though a project like putting the schedule into an iPhone (or Android...) app may seem useless, the learning experience of putting it together is invaluable (plus, other people will use it).

If you are unsure on how to contribute to this app effectively or what some code means, don't hesitate to ask a member of the project team.

On a personal note, I'm excited to see where this project goes in the future, even after I graduate.

*- Tillson Galloway, Co-Founder, Project Lead 2015-2018 *
## PG-Schedule Project Team
| Name             | Role          | Email                      |
| ---------------  |:-------------:| --------------------------:|
| Tillson Galloway | Project lead, co-founder  | tgalloway18@portergaud.edu |
| Charles Truluck  | Contributor   | ctruluck20@portergaud.edu  |
| Doug Bergman     | Advisor       | dbergman@portergaud.edu    |


The "Project Team" is by no means an exclusive list.  To be added to the Project Team list, make some form of contribution to the project (it doesn't *have* to be a code contribution) or just show genuine interest in developing something using the API, and if you are not added immidiately, let a team member know and he/she will add you.

Those on the project team have direct access to the PG-Schedule GitHub project, meaning they can push contributions without creating a fork or undergoing the pull request review process.  Additionally, team members can approve pull requests and act as an official member of Issues.  As stated previously, access to specific services (Heroku, Google Cloud, database) is given out on a case-by-case basis within the team decided by the project lead and advisor.

### Former Members
| Name             | Role          | Graduating Class | Twitter |
| ---------------  |:-------------:| ---------------- |-------: |
| Max Harley       | Co-founder    | 2016             | [@Max_68](https://twitter.com/Max_68)
