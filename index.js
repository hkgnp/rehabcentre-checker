// Key dependencies
const express = require('express');
require('dotenv').config();
const hbs = require('hbs');
const wax = require('wax-on');
const moment = require('moment-timezone');
const session = require('express-session');
const flash = require('connect-flash');
const csurf = require('csurf');

const app = express();

app.set('view engine', 'hbs');

app.use(express.static('public'));

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

//eq
require('handlebars-helpers')({
  handlebars: hbs.handlebars,
});

// date time
hbs.registerHelper('dateFormat', (date, options) => {
  const formatToUse =
    (arguments[1] && arguments[1].hash && arguments[1].hash.format) ||
    'DD/MM/YYYY';
  return moment(date).tz('Singapore').format(formatToUse);
});

// if equal function hbs helper
hbs.registerHelper('if_eq', (a, b, options) => {
  if (a === b) return options.fn(this);
  else return options.inverse(this);
});

// enable forms
app.use(
  express.urlencoded({
    extended: false,
  })
);

// setup sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Set up flash
app.use(flash());

// Set up csurf
const csurfInstance = csurf();

// Omit api route from csurf
app.use((req, res, next) => {
  if (req.url.slice(0, 5) === '/api/') {
    return next();
  }
  csurfInstance(req, res, next);
});

app.use((err, req, res, next) => {
  if (err && err.code == 'EBADCSRFTOKEN') {
    console.log(err);
    req.flash(
      'error_messages',
      'The form has expired. Please reload your page.'
    );
    res.redirect('back');
  } else {
    next();
  }
});

// Set up middleware

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages');
  res.locals.error_messages = req.flash('error_messages');
  next();
});

// User session middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// req.csrfToken
app.use((req, res, next) => {
  if (req.csrfToken) {
    res.locals.csrfToken = req.csrfToken();
  }
  next();
});

const api = {
  index: require('./routes/api/index'),
};

const indexRoute = require('./routes/index');
const userRoute = require('./routes/users');
const updateRoute = require('./routes/update');
const adminUpdateRoute = require('./routes/admin-update');

(async () => {
  app.use('/', indexRoute);
  app.use('/user', userRoute);
  app.use('/update', updateRoute);
  app.use('/admin-update', adminUpdateRoute);
  app.use('/api/index', express.json(), api.index);
})();

app.listen(process.env.PORT || 7000, () => {
  console.log('Server has started ...');
});
