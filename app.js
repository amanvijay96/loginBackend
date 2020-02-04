const users = require('./routes/users');

const errorHandler = require('./middleware/errorHandler');
const { sequelize, Sequelize } = require('./utils/db');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter, errorHandler);
app.use('/users', users, errorHandler);
app.use('/testAPI', testAPIRouter);

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use('*', function(req, res, next) {
  res.status(404).send('Invalid Url - Page not found');
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
