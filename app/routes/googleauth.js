var router = require('express').Router();
var passport = require('passport');

router.get('/manage/authenticate', passport.authenticate('google', {scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read',
]}));

router.get('/auth', passport.authenticate('google', {
  failureRedirect: '/?failedLogin',
  successRedirect: '/manage'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
