var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findOne(
    {
      _id: id
    },
    (err, user) => {
      done(err, user);
    }
  );
});
passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        // Validation
        require('../utilities/signup-validation')(req, user, done);
        if (req.flash('error').length === 0) {
          // means no error occurs then save to database
          var newUser = new User();
          newUser.email = email;
          newUser.password = newUser.encryptPassword(password);
          newUser.name = req.body.name;
          newUser.save(function(err, result) {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    }
  )
);
passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        //Validations
        require('../utilities/signin-validation')(req, user, password, done);
        if (req.flash('error').length === 0) {
          // means no error occurs then redirect to sign in
          return done(null, user);
        }
      });
    }
  )
);
