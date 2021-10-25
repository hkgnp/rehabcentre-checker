const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { User } = require('../models');

// const getHashedPassword = (password) => {
//   const sha256 = crypto.createHash('sha256');
//   const hash = sha256.update(password).digest('base64');
//   return hash;
// };

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  let user = await User.where({
    email: req.body.email,
  }).fetch({
    require: false,
  });

  if (user) {
    if (user.get('password') === req.body.password) {
      req.session.user = {
        id: user.get('id'),
        name: user.get('name'),
        email: user.get('email'),
        org_id: user.get('org_id'),
        role_id: user.get('role_id'),
      };

      let roleId = user.get('role_id');
      if (roleId === 1) {
        req.flash('success_messages', 'You are logged in');
        res.redirect('/admin-update');
      } else if (roleId === 2) {
        req.flash('success_messages', 'You are logged in');
        res.redirect('/update');
      } else {
        req.flash(
          'error_messages',
          'Fatal error. Please contact the system administrator'
        );
        res.redirect('/');
      }
    } else {
      req.flash('error_messages', 'Password is incorrect, please try again');
      res.redirect('/user/login');
    }
  } else {
    req.flash(
      'error_messages',
      'You do not have an account. Please contact the system administrator'
    );
    res.redirect('/user/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  req.flash('success_messages', 'You have been successfully logged out');
  res.redirect('/');
});

module.exports = router;
