var express = require('express');
var core = require('../controller/core.server.controller');
var r = express.Router();

r.get('/', core.home);
r.get('/upper/', core.home);
r.get('/middle/', core.middle);
r.get('/api/', core.exposeAPI);
r.get('/api/timeUntil/', core.timeUntil);
r.get('/api/currentBlock/', core.currentBlock);
r.get('/api/currentDay/', core.currentDay);
r.get('/api/getFutureDate/:month/:date/', core.getFutureWeek);

module.exports = r;
