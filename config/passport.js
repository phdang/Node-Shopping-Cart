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
        //validation
        if (user) {
          return done(null, false, { message: 'Email is already taken' });
        }
        if (req.body.name.length === 0 || req.body.name.length > 50) {
          return done(null, false, {
            message: 'Name should not be empty or exceed 50 characters'
          });
        }
        if (req.body.password.length < 6) {
          return done(null, false, {
            message: 'Password must be at least 6 characters'
          });
        }
        if (req.body.password !== req.body.confirmPassword) {
          return done(null, false, {
            message: 'Password does not match the confirm password'
          });
        }

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
      });
    }
  )
);
