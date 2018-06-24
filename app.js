var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
//connect mongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECT_URI);

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Add body-bodyParser

app.use(cookieParser());
app.use(
  session({
    secret: 'phd_shopping-cart',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
