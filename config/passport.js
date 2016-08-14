var logger = require('../logging.js');

module.exports = function(passport, GoogleStrategy, User, config){
  passport.use(new GoogleStrategy({process.env.GoogleStrategyConfig},
    function(request, accessToken, refreshToken, profile, done){
      User.findOrCreate({ where: { id: profile.id }, defaults: {
        userType: -1,
        name: profile.name.givenName + " " + profile.name.familyName,
        email: profile.emails[0].value,
      }})
      .spread(function(user, created){
        if(!created && !user){
          return done("Could not create user", null);
        }

        logger.login(request, profile.emails[0].value, 'login');
        return done(null, profile);
      });

  }));

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findOne({ where: { id: id } })
    .then(function(user){
      done(null, user);
    });
  });
}
