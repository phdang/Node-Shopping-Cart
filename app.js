var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var validator = require('express-validator');
var passport = require('passport');
var flash = require('connect-flash');
var logger = require('morgan');

const mongoose = require('mongoose');
//connect mongoDB
mongoose.connect(process.env.MONGO_CONNECT_URI);
//config passport
require('./config/passport');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var cartRouter = require('./routes/cart');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
// Add body-bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add validation
app.use(validator());

app.use(cookieParser());
// add session
app.use(
  session({
    secret: 'phd_shopping-cart',
    resave: false,
    saveUninitialized: false
  })
);
app.use(function(req, res, next) {
  req.session.cookie.maxAge = 180 * 60 * 1000; // 3 hours
  next();
});

// flash
app.use(flash());
//passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Set global variable for views templating engine
app.use((req, res, next) => {
  res.locals.isAuth = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //development mode
  res.render(err.message);
  // production mode
  // res.render('error/error', {
  //   title: '404 Page Not Found',
  //   home: process.env.BASE_URL
  // });
});

module.exports = app;
