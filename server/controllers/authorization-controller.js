var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require("../models/mongo-model").user;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ name: username }).exec(function(err, user) {
      console.log(user);
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ _id: id }).exec(function(err, user) {
    if(err) {
      console.log('Error loading user: ' + err);
      return;
    }

    if(user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
})

module.exports = passport;
