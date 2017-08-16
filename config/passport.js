var isProd = (process.env.PG_PORT == 80)

module.exports = function(passport, GoogleStrategy, User){
  passport.use(new GoogleStrategy({
    clientID: process.env.PG_GOOGLE_CLIENT,
    clientSecret: process.env.PG_CLIENT_SECRET,
    callbackURL: isProd ? 'http://schedule.portergaud.edu/auth' : 'http://schedule.test.portergaud.edu:8080/auth'
  },
    function(request, accessToken, refreshToken, profile, done){
      User.findOrCreate({ where: { id: profile.id }, defaults: {
        level: -1,
        name: profile.name.givenName + " " + profile.name.familyName,
        email: profile.emails[0].value,
      }})
      .spread(function(user, created){
        if(!created && !user){
          return done("Could not create user", null);
        }
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
